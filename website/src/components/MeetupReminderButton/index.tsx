import React, { useState } from "react";
import { MeetupReminderButtonProps } from "./types";
import { DEFAULT_SESSIONS } from "./constants";
import { useMeetupSessions } from "./hooks/useMeetupSessions";
import { useClickOutside } from "./hooks/useClickOutside";
import { copyToClipboard } from "./utils/calendarUtils";
import { SessionList } from "./components/SessionList";
import { SessionDetails } from "./components/SessionDetails";
import styles from "./styles.module.css";

/**
 * Floating button that shows multiple meetup sessions
 * Positioned at bottom-right, expandable with session selection
 */
const MeetupReminderButton: React.FC<MeetupReminderButtonProps> = ({
  sessions = DEFAULT_SESSIONS,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const { sessionDates, meetingStatuses } = useMeetupSessions(sessions);
  const { panelRef, buttonRef } = useClickOutside({
    isOpen: isExpanded,
    onClose: () => {
      setIsExpanded(false);
      setSelectedSession(null);
    },
    onBack: () => setSelectedSession(null),
    hasBackAction: !!selectedSession,
  });

  const handleCopyLink = async (link: string) => {
    const success = await copyToClipboard(link);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  const currentSession = sessions.find((s) => s.id === selectedSession);
  const currentSessionDate = selectedSession
    ? sessionDates.get(selectedSession)
    : null;
  const currentMeetingStatus = selectedSession
    ? meetingStatuses.get(selectedSession)
    : undefined;

  if (sessionDates.size === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button
        ref={buttonRef}
        className={`${styles.floatingButton} ${
          isExpanded ? styles.expanded : ""
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={handleKeyDown}
        aria-label="Toggle DevEx Sessions"
        aria-expanded={isExpanded}
        aria-controls="meetup-panel"
        type="button"
      >
        <svg
          className={styles.icon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 2V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 2V6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 10H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.buttonText}>DevEx Sessions</span>
      </button>

      {isExpanded && (
        <div
          ref={panelRef}
          id="meetup-panel"
          className={styles.panel}
          role="dialog"
          aria-label="DevEx Sessions information panel"
        >
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>
              {selectedSession ? currentSession?.name : "Select a DevEx Session"}
            </h3>
            <button
              className={styles.closeButton}
              onClick={() => {
                setIsExpanded(false);
                setSelectedSession(null);
              }}
              aria-label="Close DevEx Sessions panel"
              type="button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className={styles.panelContent}>
            {!selectedSession ? (
              <SessionList
                sessions={sessions}
                sessionDates={sessionDates}
                meetingStatuses={meetingStatuses}
                onSelectSession={setSelectedSession}
              />
            ) : (
              currentSession &&
              currentSessionDate &&
              currentMeetingStatus !== undefined && (
                <SessionDetails
                  session={currentSession}
                  sessionDate={currentSessionDate}
                  meetingStatus={currentMeetingStatus}
                  copied={copied}
                  onBack={() => setSelectedSession(null)}
                  onCopyLink={handleCopyLink}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetupReminderButton;
