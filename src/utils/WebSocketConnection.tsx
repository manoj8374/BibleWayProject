import React, { useEffect, useRef, useState } from 'react';
import './WebSocketConnection.css';

const WebSocketConnection: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'Connecting' | 'Connected' | 'Disconnected' | 'Error'>('Disconnected');
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const WS_URL = 'ws://192.168.1.12:8000/ws/user/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY1ODg3NzMyLCJpYXQiOjE3NjU4ODQxMzIsImp0aSI6IjFiMGY5OGY1N2E1MTQxMTc5NjFlNmRhMGU3NDNkOWY1IiwidXNlcl9pZCI6ImMwMmIxMmUxLTJlMGMtNGIzZi04MWExLTJmNGFmZmRmODg1YyIsImVtYWlsIjoibWFub2pAZ21haWwuY29tIiwidXNlcl9uYW1lIjoiTWFub2pWYWtpdGkiLCJpc19zdGFmZiI6ZmFsc2UsImlzX3N1cGVydXNlciI6ZmFsc2V9.4tizZV-voxU-ws1silffBHi_auftwHRbmOs3wSy54o4';

  const connectWebSocket = () => {
    try {
      setConnectionStatus('Connecting');
      setError(null);

      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionStatus('Connected');
        setError(null);
        addMessage('WebSocket connection opened');
      };

      ws.onmessage = (event) => {
        try {
          const data = typeof event.data === 'string' ? event.data : JSON.parse(event.data);
          addMessage(`Received: ${typeof data === 'string' ? data : JSON.stringify(data)}`);
        } catch (err) {
          addMessage(`Received: ${event.data}`);
        }
      };

      ws.onerror = (error) => {
        setConnectionStatus('Error');
        setError('WebSocket error occurred');
        console.error('WebSocket error:', error);
      };

      ws.onclose = (event) => {
        setConnectionStatus('Disconnected');
        addMessage(`Connection closed. Code: ${event.code}, Reason: ${event.reason || 'No reason provided'}`);
        
        // Attempt to reconnect after 3 seconds if not manually closed
        if (event.code !== 1000) {
          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket();
          }, 3000);
        }
      };
    } catch (err) {
      setConnectionStatus('Error');
      setError(err instanceof Error ? err.message : 'Failed to connect');
      console.error('Connection error:', err);
    }
  };

  const disconnectWebSocket = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close(1000, 'Manual disconnect');
      wsRef.current = null;
    }
  };

  const sendMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
      addMessage(`Sent: ${message}`);
    } else {
      setError('WebSocket is not connected');
    }
  };

  const addMessage = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setMessages((prev) => [...prev, `[${timestamp}] ${message}`]);
  };

  useEffect(() => {
    // Auto-connect on component mount
    connectWebSocket();

    // Cleanup on unmount
    return () => {
      disconnectWebSocket();
    };
  }, []);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'Connected':
        return '#4caf50';
      case 'Connecting':
        return '#ff9800';
      case 'Error':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  return (
    <div className="websocket-container">
      <div className="websocket-header">
        <h1>WebSocket Connection</h1>
        <div className="status-indicator">
          <span
            className="status-dot"
            style={{ backgroundColor: getStatusColor() }}
          ></span>
          <span className="status-text">{connectionStatus}</span>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="controls">
        <button
          onClick={connectWebSocket}
          disabled={connectionStatus === 'Connected' || connectionStatus === 'Connecting'}
          className="btn btn-connect"
        >
          Connect
        </button>
        <button
          onClick={disconnectWebSocket}
          disabled={connectionStatus === 'Disconnected'}
          className="btn btn-disconnect"
        >
          Disconnect
        </button>
        <button
          onClick={() => setMessages([])}
          className="btn btn-clear"
        >
          Clear Messages
        </button>
      </div>

      <div className="message-input-section">
        <input
          type="text"
          placeholder="Type a message to send..."
          className="message-input"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
              sendMessage(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
        <button
          onClick={(e) => {
            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
            if (input && input.value.trim()) {
              sendMessage(input.value);
              input.value = '';
            }
          }}
          className="btn btn-send"
        >
          Send
        </button>
      </div>

      <div className="messages-container">
        <h2>Messages</h2>
        <div className="messages-list">
          {messages.length === 0 ? (
            <div className="no-messages">No messages yet...</div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="message-item">
                {msg}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WebSocketConnection;

