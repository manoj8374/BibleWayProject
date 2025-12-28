import React, { useState, useEffect } from 'react';
import { chatService, type InboxItem } from '../../services/chat/chat.service';
import InboxListItem from './InboxListItem';
import { useI18n } from '../../i18n';

interface InboxComponentProps {
  onPersonSelect: (personId: string, conversationId: string, personName: string) => void;
}

const InboxComponent: React.FC<InboxComponentProps> = ({ onPersonSelect }) => {
  const { t } = useI18n();
  const [inbox, setInbox] = useState<InboxItem[]>([]);
  const [inboxLoading, setInboxLoading] = useState(false);

  useEffect(() => {
    fetchInbox();
  }, []);

  const fetchInbox = async () => {
    setInboxLoading(true);
    try {
      const res = await chatService.getInbox();
      if (res.success && res.data) {
        // Sort inbox items by last_activity_at (most recent first)
        const sortedInbox = [...res.data].sort((a, b) => {
          const timeA = new Date(a.last_activity_at).getTime();
          const timeB = new Date(b.last_activity_at).getTime();
          return timeB - timeA; // Most recent first
        });
        setInbox(sortedInbox);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setInboxLoading(false);
    }
  };

  return (
    <>
      {inboxLoading && <div style={{ padding: '10px', textAlign: 'center', color: '#6B7280' }}>{t('people.loadingInbox')}</div>}
      {!inboxLoading && inbox.length === 0 && <div style={{ padding: '10px', textAlign: 'center', color: '#6B7280' }}>{t('people.noMessages')}</div>}
      {!inboxLoading && inbox.map(item => (
        <InboxListItem
          key={item.conversation_id}
          item={item}
          onPersonSelect={onPersonSelect}
        />
      ))}
    </>
  );
};

export default InboxComponent;

