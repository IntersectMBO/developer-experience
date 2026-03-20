import React from "react";
import { MeetupSession } from "../types";
import {
  formatMeetupDate,
  formatCountdown,
  MeetingStatus,
} from "../utils/dateUtils";
import { generateGoogleCalendarUrl } from "../utils/calendarUtils";
import styles from "../styles.module.css";

interface SessionDetailsProps {
  session: MeetupSession;
  sessionDate: Date;
  meetingStatus: MeetingStatus;
  copied: boolean;
  onBack: () => void;
  onCopyLink: (link: string) => void;
}

/**
 * Component to display detailed session information
 */
export const SessionDetails: React.FC<SessionDetailsProps> = ({
  session,
  sessionDate,
  meetingStatus,
  copied,
  onBack,
  onCopyLink,
}) => {
  const handleAddToCalendar = () => {
    const calendarUrl = generateGoogleCalendarUrl(session, sessionDate);
    window.open(calendarUrl, "_blank", "noopener,noreferrer");
  };

  // Join button is enabled from start of meeting day until meeting ends
  const isJoinEnabled =
    meetingStatus === MeetingStatus.STARTING_SOON ||
    meetingStatus === MeetingStatus.ONGOING;

  // Get appropriate date/time display text
  const getDateTimeDisplay = (): string => {
    switch (meetingStatus) {
      case MeetingStatus.STARTING_SOON:
        return `Today's meeting ${formatCountdown(sessionDate)}`;
      case MeetingStatus.ONGOING:
        return "Meeting ongoing";
      case MeetingStatus.ENDED:
      case MeetingStatus.BEFORE_DAY:
      default:
        return formatMeetupDate(sessionDate);
    }
  };

  return (
    <>
      <button className={styles.backButton} onClick={onBack} type="button">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to sessions
      </button>

      <div className={styles.dateSection}>
        <svg
          className={styles.sectionIcon}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 6V12L16 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <div className={styles.dateText}>
          <p className={styles.dateLabel}>Date & Time</p>
          <p className={styles.dateValue}>{getDateTimeDisplay()}</p>
        </div>
      </div>

      <div className={styles.linkSection}>
        <p className={styles.linkLabel}>Meeting Link</p>
        <div className={styles.linkActions}>
          <a
            href={isJoinEnabled ? session.meetupLink : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.linkButton} ${
              !isJoinEnabled ? styles.disabled : ""
            }`}
            aria-label={
              isJoinEnabled
                ? "Open meetup link in new tab"
                : meetingStatus === MeetingStatus.ENDED
                ? "Meeting has ended"
                : "Event link will be available on meeting day"
            }
            aria-disabled={!isJoinEnabled}
            onClick={(e) => {
              if (!isJoinEnabled) {
                e.preventDefault();
              }
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 3H21V9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 14L21 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Join Event
          </a>
          <button
            onClick={() => onCopyLink(session.meetupLink)}
            className={`${styles.linkButton} ${copied ? styles.copied : ""}`}
            aria-label={copied ? "Link copied" : "Copy meetup link"}
            type="button"
          >
            {copied ? (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    x="9"
                    y="9"
                    width="13"
                    height="13"
                    rx="2"
                    ry="2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Copy Link
              </>
            )}
          </button>
        </div>
      </div>

      <div className={styles.calendarSection}>
        <button
          onClick={handleAddToCalendar}
          className={styles.calendarButton}
          aria-label="Add to Google Calendar"
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
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
              ry="2"
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
            <path
              d="M12 14L12 14.01"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Add to Google Calendar
        </button>
      </div>
    </>
  );
};
