import React, { useState, useEffect, useRef, useCallback } from 'react';
import { chatService, type InboxItem, type WSInboxUpdatedEvent, mapInboxUpdatedToInboxItem } from '../../services/chat/chat.service';
import InboxListItem from './InboxListItem';
import { useI18n } from '../../i18n';
import { useWebSocketEvent } from '../../contexts/WebSocketContext';
import { webSocketService } from '../../services/websocket/websocket.service';

interface InboxComponentProps {
  onPersonSelect: (personId: string, conversationId: string, personName: string) => void;
  changePerson: (person: any) => void;
}

const InboxComponent: React.FC<InboxComponentProps> = ({ onPersonSelect, changePerson }) => {
  const { t } = useI18n();
  const [inbox, setInbox] = useState<InboxItem[]>([]);
  const [inboxLoading, setInboxLoading] = useState(false);
  const isInitialLoadCompleteRef = useRef(false);
  const isMountedRef = useRef(true);

  // Sort inbox by last_activity_at (newest first)
  const sortInbox = useCallback((items: InboxItem[]): InboxItem[] => {
    return [...items].sort((a, b) => {
      try {
        const timeA = a.last_activity_at ? new Date(a.last_activity_at).getTime() : 0;
        const timeB = b.last_activity_at ? new Date(b.last_activity_at).getTime() : 0;
        return timeB - timeA; // Most recent first
      } catch (error) {
        console.error('Error sorting inbox:', error);
        return 0;
      }
    });
  }, []);

  const fetchInbox = async () => {
    setInboxLoading(true);
    isInitialLoadCompleteRef.current = false;
    try {
      const res = await chatService.getInbox();
      if (res.success && res.data && isMountedRef.current) {
        const sortedInbox = sortInbox(res.data);
        setInbox(sortedInbox);
        isInitialLoadCompleteRef.current = true;
      }
    } catch (e) {
      console.error('Error fetching inbox:', e);
      if (isMountedRef.current) {
        isInitialLoadCompleteRef.current = true; // Enable WebSocket updates even on error
      }
    } finally {
      if (isMountedRef.current) {
        setInboxLoading(false);
      }
    }
  };

  const subscribeToInboxUpdates = ()=>{
    webSocketService.send({
      action: 'get_inbox',
      request_id: '123',
    });
  }

  useEffect(() => {
    fetchInbox();
    setTimeout(subscribeToInboxUpdates, 4000);
  }, []);

  const handleInboxUpdated = (event: WSInboxUpdatedEvent) => {
    console.log("Inbox updated", event);

    try {
      if (!event || !event.data || !event.data.conversation_id) {
        console.warn('Invalid inbox.updated event: missing required fields');
        return;
      }


      const updatedItem = mapInboxUpdatedToInboxItem(event.data);
      if (!updatedItem) {
        console.warn('Failed to map inbox.updated event to InboxItem');
        return;
      }

      console.log("Updating the items", event.data);


      console.log("Updating the items")

      setInbox((prevInbox) => {
        const existingIndex = prevInbox.findIndex(
          (item) => item.conversation_id === updatedItem.conversation_id
        );

        let newInbox: InboxItem[];

        if (existingIndex >= 0) {
          const existingItem = prevInbox[existingIndex];
          const mergedItem: InboxItem = {
            ...existingItem,
            ...updatedItem,
            name: updatedItem.type === 'DIRECT' ? updatedItem.name : (updatedItem.name || existingItem.name),
            image: updatedItem.type === 'DIRECT' ? updatedItem.image : (updatedItem.image || existingItem.image),
            description: updatedItem.description || existingItem.description, // Preserve if not in update
          };
          newInbox = [...prevInbox];
          newInbox[existingIndex] = mergedItem;
        } else {
          newInbox = [...prevInbox, updatedItem];
        }

        console.log("New inbox", newInbox);
        
        return sortInbox(newInbox);
      });
    } catch (error) {
      console.error('Error handling inbox.updated event:', error);
    }
  };

  useWebSocketEvent('inbox.updated', handleInboxUpdated);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <>
      {inboxLoading && <div style={{ padding: '10px', textAlign: 'center', color: '#6B7280' }}>{t('people.loadingInbox')}</div>}
      {!inboxLoading && inbox.length === 0 && <div style={{ padding: '10px', textAlign: 'center', color: '#6B7280' }}>{t('people.noMessages')}</div>}
      {!inboxLoading && inbox.map(item => (
        <InboxListItem
          key={item.conversation_id}
          item={item}
          onPersonSelect={onPersonSelect}
          changePerson={changePerson}
        />
      ))}
    </>
  );
};

export default InboxComponent;

