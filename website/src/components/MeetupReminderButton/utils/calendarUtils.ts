import { MeetupSession } from "../types";
import { formatGoogleDate, getDayOfWeekCode } from "./dateUtils";

/**
 * Generate Google Calendar URL with event details and recurrence
 */
export const generateGoogleCalendarUrl = (
  session: MeetupSession,
  startDate: Date
): string => {
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration
  const dayOfWeek = getDayOfWeekCode(startDate);
  const interval = session.recurrence?.interval || 2; // Default to bi-weekly

  const params = {
    action: "TEMPLATE",
    text: encodeURIComponent(session.title),
    details: encodeURIComponent(
      `${session.description}\n\nJoin the meeting: ${session.meetupLink}`
    ),
    location: encodeURIComponent(session.meetupLink),
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
    recur: encodeURIComponent(
      `RRULE:FREQ=WEEKLY;INTERVAL=${interval};BYDAY=${dayOfWeek}`
    ),
    ctz: "UTC",
  };

  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `https://calendar.google.com/calendar/render?${queryString}`;
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
};
