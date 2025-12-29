import React, { useState, useEffect } from 'react';
import {
  SidebarContainer,
  SidebarTitle,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  PeopleList,
  InboxContainer
} from './PeopleSearchSidebar.styles';
import { userService, type UserProfile } from '../../services/user/user.service';
import PeopleListItem from './PeopleListItem';
import InboxComponent from './InboxComponent';
import { showError } from '../../utils/toast';
import { useI18n } from '../../i18n';

interface PeopleSearchSidebarProps {
  onPersonSelect: (personId: string, conversationId: string, personName: string) => void;
  selectedPersonId?: string;
  onViewChange: (view: 'profile' | 'chat' | 'peopleSearch') => void;
  changePerson: (person: any) => void;
}

const PeopleSearchSidebar: React.FC<PeopleSearchSidebarProps> = ({
  onPersonSelect,
  selectedPersonId,
  onViewChange,
  changePerson
}) => {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [people, setPeople] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (query: string) => {
    setLoading(true);
    const response = await userService.searchUsers(query, 20);
    if (response.success) {
      setPeople(response.data);
    }else{
      showError(response.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchQuery.length >= 2) {
        fetchUsers(searchQuery);
      } else {
        setPeople([]);
      }
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  const handlePersonClick = (personId: string, conversationId: string, personName: string) => {
    if (onPersonSelect) {
      onPersonSelect(personId, conversationId, personName);
    }
  };

  return (
    <SidebarContainer>
      <SidebarTitle>{t('people.searchPeople')}</SidebarTitle>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder={t('people.searchPeoplePlaceholder')}
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
        <SearchIcon>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </SearchIcon>
      </SearchWrapper>
      <PeopleList>
        {loading && <div style={{ padding: '10px', textAlign: 'center', color: '#6B7280' }}>{t('people.searching')}</div>}
        
        {!loading && people.length === 0 && searchQuery.length >= 2 && (
             <div style={{ padding: '10px', textAlign: 'center', color: '#6B7280' }}>{t('people.noUsersFound')}</div>
        )}

        {people.map((person) => (
          <PeopleListItem
            key={person.user_id}
            person={person}
            isSelected={selectedPersonId === person.user_id}
            onSelect={handlePersonClick}
            onChatClick={(personId, conversationId, personName) => {
               if (onPersonSelect) {onPersonSelect(personId, conversationId, personName);};
            }}
            onViewChange={onViewChange}
            changePerson={changePerson}
          />
        ))}

        {searchQuery.length < 2 && (
          <InboxContainer>
            <InboxComponent onPersonSelect={onPersonSelect} changePerson={changePerson} />
          </InboxContainer>
        )}
      </PeopleList>
    </SidebarContainer>
  );
};
export default PeopleSearchSidebar;
