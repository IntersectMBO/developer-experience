import { useState, useEffect } from "react";
import { MeetupSession } from "../types";
import {
  calculateNextMeetup,
  getMeetingStatus,
  MeetingStatus,
} from "../utils/dateUtils";

interface UseMeetupSessionsReturn {
  sessionDates: Map<string, Date>;
  meetingStatuses: Map<string, MeetingStatus>;
}

/**
 * Custom hook to manage meetup session dates and meeting status
 */
export const useMeetupSessions = (
  sessions: MeetupSession[]
): UseMeetupSessionsReturn => {
  const [sessionDates, setSessionDates] = useState<Map<string, Date>>(
    new Map()
  );
  const [meetingStatuses, setMeetingStatuses] = useState<
    Map<string, MeetingStatus>
  >(new Map());

  // Calculate next meetup dates for all sessions
  useEffect(() => {
    const dates = new Map<string, Date>();
    sessions.forEach((session) => {
      const interval = session.recurrence?.interval || 2; // Default to bi-weekly
      dates.set(session.id, calculateNextMeetup(session.baseDate, interval));
    });
    setSessionDates(dates);
  }, [sessions]);

  // Update meeting statuses every minute
  useEffect(() => {
    if (sessionDates.size === 0) return;

    const updateStatuses = () => {
      const statuses = new Map<string, MeetingStatus>();
      sessionDates.forEach((date, sessionId) => {
        statuses.set(sessionId, getMeetingStatus(date));
      });
      setMeetingStatuses(statuses);
    };

    updateStatuses();

    // Update every minute to keep status accurate
    const interval = setInterval(updateStatuses, 60000);

    return () => clearInterval(interval);
  }, [sessionDates]);

  return { sessionDates, meetingStatuses };
};
