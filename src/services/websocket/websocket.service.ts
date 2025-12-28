type WebSocketCallback = (data: any) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private listeners: Map<string, WebSocketCallback[]> = new Map();
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectInterval: number = 3000;
  private url: string | null = null;
  private isConnecting: boolean = false;

  private static instance: WebSocketService;

  private constructor() {}

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  connect(url: string) {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
        return;
    }

    this.url = url;
    this.isConnecting = true;

    try {
        this.ws = new WebSocket(url);


        this.ws.onopen = () => {
            this.isConnecting = false;
            this.reconnectAttempts = 0;
            this.emit('connection_status', { status: 'connected' });
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                
                // Handle ping/pong heartbeat
                if (data.type === 'pong') {
                    this.emit('pong', data);
                    return;
                }
                
                // Handle notification messages
                if (data.type === 'notification') {
                    this.emit('notification', data);
                    return;
                }
                
                // Handle other message types
                if (data.type) {
                    this.emit(data.type, data.payload || data);
                } else {
                     this.emit('message', data);
                }
            } catch (e) {
                console.error('Failed to parse WebSocket message', e);
            }
        };

        this.ws.onclose = () => {
            this.isConnecting = false;
            this.ws = null;
            this.emit('connection_status', { status: 'disconnected' });
            this.handleReconnect();
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket Error', error);
            this.isConnecting = false;
        };

    } catch (error) {
        console.error('WebSocket Connection Failed', error);
        this.isConnecting = false;
        this.handleReconnect();
    }
  }

  disconnect() {
    if (this.ws) {
        this.ws.close();
        this.ws = null;
    }
    this.url = null;
  }

  private handleReconnect() {
      if (!this.url) return;

      if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          setTimeout(() => {
              if (this.url) this.connect(this.url);
          }, this.reconnectInterval * this.reconnectAttempts);
      } else {
          console.error('Max reconnect attempts reached');
      }
  }

  subscribe(event: string, callback: WebSocketCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  unsubscribe(event: string, callback: WebSocketCallback) {
    if (!this.listeners.has(event)) return;
    
    const callbacks = this.listeners.get(event);
    if (callbacks) {
        this.listeners.set(event, callbacks.filter(cb => cb !== callback));
    }
  }

  private emit(event: string, data: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(cb => cb(data));
    }
  }

  send(data: any) {
      if (this.ws?.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
      } else {
          console.warn('WebSocket not open. Cannot send message.');
      }
  }

  ping(requestId?: string) {
      if (this.ws?.readyState === WebSocket.OPEN) {
          this.send({
              action: 'ping',
              request_id: requestId
          });
      }
  }
}

export const webSocketService = WebSocketService.getInstance();
