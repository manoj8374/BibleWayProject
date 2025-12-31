import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
import { userService } from "../../services/user/user.service";

const PeoplePage: React.FC = () => {
  const { t } = useI18n();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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

  const [selectedPerson, setSelectedPerson] = useState<any | undefined>(undefined);
  const [isInitializingFromParams, setIsInitializingFromParams] = useState(false);
  const hasInitializedFromParams = useRef(false);

  // Initialize from query parameters on mount
  useEffect(() => {
    // Only run once on mount
    // if (hasInitializedFromParams.current) return;
    
    const conversationId = searchParams.get("conversation_id");
    const userId = searchParams.get("user_id");
    const userName = searchParams.get("user_name");
    const profilePictureUrl = searchParams.get("profile_picture_url");

    // If user_id is provided, open chat view (with or without conversation_id)
    if (userId) {
      hasInitializedFromParams.current = true;
      setIsInitializingFromParams(true);
      
      // Set conversation ID if provided
      if (conversationId) {
        setCurrentConversationId(conversationId);
      }
      
      // Set view to chat
      setSelectedView("chat");

      // Set user ID and name
      setSelectedPersonId(userId);
      if (userName) {
        setSelectedPersonName(userName);
      }

      // If profile picture URL is provided, set selectedPerson with minimal data
      if (profilePictureUrl) {
        setSelectedPerson({
          user_id: userId,
          user_name: userName || "",
          profile_picture_url: profilePictureUrl,
        });
      }

      // Fetch full user profile
      userService
        .getCompleteUserProfile(userId)
        .then((response) => {
          if (response.success && response.data) {
            setSelectedPerson(response.data);
            // Update selectedPersonName if not already set
            if (!userName && response.data.user_name) {
              setSelectedPersonName(response.data.user_name);
            }
            // If conversation_id wasn't in URL but exists in profile, use it
            if (!conversationId && response.data.conversation_id) {
              setCurrentConversationId(response.data.conversation_id);
            }
          }
        })
        .catch((error) => {
          console.error("Failed to fetch user profile:", error);
          // Continue with available data even if fetch fails
        })
        .finally(() => {
          setIsInitializingFromParams(false);
        });

      // Clean URL after reading params
      navigate("/people", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, navigate]); // Include dependencies but use ref to prevent re-runs

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

  const changePerson = (person: any) => {
    console.log("changing person", person);
    setSelectedPerson(person);
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
          changePerson={changePerson}
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
                userAvatar={selectedPerson?.profile_picture_url || ""}
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
