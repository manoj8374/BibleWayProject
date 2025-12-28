import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { webSocketService } from '../services/websocket/websocket.service';
import { WS_URL } from '../constants/baseUrl';

interface WebSocketContextType {
  isConnected: boolean;
  service: typeof webSocketService;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const retryAttemptRef = useRef(0);
  const maxRetries = 3;
  const retryInterval = 2000;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const hasConnectedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    hasConnectedRef.current = false;
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.warn('No access token found. Skipping WebSocket connection.');
      return;
    }

    const wsUrl = `${WS_URL}/ws/user/?token=${token}`;
    retryAttemptRef.current = 0;

    const attemptConnection = () => {
      if (!isMountedRef.current) return;

      if (hasConnectedRef.current) {
        return;
      }

      if (retryAttemptRef.current >= maxRetries) {
        console.error(`Max retry attempts (${maxRetries}) reached. Stopping connection attempts.`);
        return;
      }

      retryAttemptRef.current += 1;

      webSocketService.disconnect();
      
      setTimeout(() => {
        if (!isMountedRef.current || hasConnectedRef.current) return;
        webSocketService.connect(wsUrl);
      }, 100);
    };

    const handleStatusChange = (data: { status: string }) => {
      if (!isMountedRef.current) return;

      setIsConnected(data.status === 'connected');

      if (data.status === 'connected') {
        if (!hasConnectedRef.current) {
          console.log('WebSocket connected successfully!');
          hasConnectedRef.current = true;
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        retryAttemptRef.current = 0;
      } else if (data.status === 'disconnected') {
        if (retryAttemptRef.current < maxRetries && !hasConnectedRef.current && isMountedRef.current) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            if (isMountedRef.current && !hasConnectedRef.current) {
              attemptConnection();
            }
          }, retryInterval);
        }
      }
    };

    webSocketService.subscribe('connection_status', handleStatusChange);

    attemptConnection();

    const retryCheckInterval = setInterval(() => {
      if (!isMountedRef.current) return;
      
      if (!hasConnectedRef.current && retryAttemptRef.current < maxRetries) {
        if (!timeoutRef.current) {
          timeoutRef.current = setTimeout(() => {
            if (isMountedRef.current && !hasConnectedRef.current) {
              attemptConnection();
            }
          }, retryInterval);
        }
      }
    }, 1000);

    return () => {
      isMountedRef.current = false;
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      clearInterval(retryCheckInterval);
      webSocketService.unsubscribe('connection_status', handleStatusChange);
      webSocketService.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ isConnected, service: webSocketService }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export const useWebSocketEvent = (event: string, callback: (data: any) => void) => {
    const { service } = useWebSocket();

    useEffect(() => {
        service.subscribe(event, callback);
        return () => {
            service.unsubscribe(event, callback);
        };
    }, [service, event, callback]);
};
