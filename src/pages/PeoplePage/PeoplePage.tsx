import React, { useState } from "react";
import {
  ChatOrProfileWrapper,
  ChatViewWrapper,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyState,
  PageContainer,
  PeopleSearchWrapper,
} from "./PeoplePage.styles";
import PeopleSearchSidebar from "../../components/PeopleSearchSidebar/PeopleSearchSidebar";
import ProfileViewer from "../../components/ProfileViewer/ProfileViewer";
import ChatView from "../../components/ChatView/ChatView";
import { useI18n } from "../../i18n/hooks";
import { webSocketService } from "../../services/websocket/websocket.service";

const PeoplePage: React.FC = () => {
  const { t } = useI18n();
  const [selectedPersonId, setSelectedPersonId] = useState<
    string | undefined
  >();
  const [selectedView, setSelectedView] = useState<
    "profile" | "chat" | "peopleSearch" | ""
  >("peopleSearch");
  const [currentConversationId, setCurrentConversationId] = useState<
    string | undefined
  >();
  const [selectedPersonName, setSelectedPersonName] = useState<
    string | undefined
  >();

  const handlePersonSelect = (
    personId: string,
    conversationId: string,
    personName: string
  ) => {
    setSelectedPersonId(personId);
    setSelectedView("chat");
    setCurrentConversationId(conversationId);
    setSelectedPersonName(personName);
  };

  const onCloseChatWindow = () => {
    setSelectedPersonId(undefined);
    setSelectedView("peopleSearch");
  };




  const leaveConversation = (id: string) => {
    if (!id) return;
    webSocketService.send({
      action: "leave_conversation",
      request_id: "ranodm ",
      conversation_id: id,
    });
  };

  const changeView = (view: "profile" | "chat" | "peopleSearch" | "") => {
    setSelectedView(view);

    if(currentConversationId) {
      leaveConversation(currentConversationId);
    }

    if (view === "") {
      setSelectedPersonId(undefined);
      setCurrentConversationId(undefined);
      setSelectedPersonName(undefined);
    }
  };

  return (
    <PageContainer>
      <PeopleSearchWrapper $shouldShow={selectedView === "peopleSearch"}>
        <PeopleSearchSidebar
          selectedPersonId={selectedPersonId}
          onPersonSelect={handlePersonSelect}
          onViewChange={changeView}
        />
      </PeopleSearchWrapper>

      {(selectedView === "profile" || selectedView === "chat") && (
        <ChatOrProfileWrapper>
          {selectedPersonId && selectedView === "profile" && (
            <ProfileViewer
              userId={selectedPersonId}
              onBack={() => onCloseChatWindow()}
            />
          )}

          {selectedPersonId && selectedView === "chat" && (
            <ChatViewWrapper>
              <ChatView
                key={currentConversationId}
                conversationId={currentConversationId || ""}
                selectedPersonId={selectedPersonId}
                userName={selectedPersonName || ""}
                onClose={onCloseChatWindow}
                onViewChange={(view) =>
                  changeView(view as "profile" | "chat" | "peopleSearch")
                }
              />
            </ChatViewWrapper>
          )}
        </ChatOrProfileWrapper>
      )}

      {selectedView === "peopleSearch" && (
        <EmptyState>
          <EmptyStateTitle>
            {t("pages.peoplePage.noConversationSelected")}
          </EmptyStateTitle>
          <EmptyStateDescription>
            {t("pages.peoplePage.selectConversationDescription")}
          </EmptyStateDescription>
        </EmptyState>
      )}
    </PageContainer>
  );
};

export default PeoplePage;
