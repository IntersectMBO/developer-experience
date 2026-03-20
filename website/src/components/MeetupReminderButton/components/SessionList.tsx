import React from "react";
import { MeetupSession } from "../types";
import {
  formatMeetupDate,
  formatCountdown,
  MeetingStatus,
} from "../utils/dateUtils";
import styles from "../styles.module.css";

interface SessionListProps {
  sessions: MeetupSession[];
  sessionDates: Map<string, Date>;
  meetingStatuses: Map<string, MeetingStatus>;
  onSelectSession: (sessionId: string) => void;
}

/**
 * Component to display session selection list
 */
export const SessionList: React.FC<SessionListProps> = ({
  sessions,
  sessionDates,
  meetingStatuses,
  onSelectSession,
}) => {
  const getSessionStatusText = (
    sessionId: string,
    date: Date | undefined
  ): string => {
    if (!date) return "";

    const status = meetingStatuses.get(sessionId);

    switch (status) {
      case MeetingStatus.STARTING_SOON:
        return `Today's meeting ${formatCountdown(date)}`;
      case MeetingStatus.ONGOING:
        return "Meeting ongoing";
      case MeetingStatus.ENDED:
      case MeetingStatus.BEFORE_DAY:
      default:
        return `Next: ${formatMeetupDate(date)}`;
    }
  };

  return (
    <div className={styles.sessionSelection}>
      <p className={styles.selectionPrompt}>
        Choose which session you'd like to view:
      </p>
      <div className={styles.sessionList}>
        {sessions.map((session) => {
          const nextDate = sessionDates.get(session.id);
          return (
            <button
              key={session.id}
              className={styles.sessionOption}
              onClick={() => onSelectSession(session.id)}
              type="button"
            >
              <div className={styles.sessionOptionContent}>
                <h4 className={styles.sessionOptionTitle}>{session.name}</h4>
                {nextDate && (
                  <p className={styles.sessionOptionDate}>
                    {getSessionStatusText(session.id, nextDate)}
                  </p>
                )}
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
};
