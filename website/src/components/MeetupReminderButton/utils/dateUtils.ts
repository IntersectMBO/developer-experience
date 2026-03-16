/**
 * Calculate next occurrence from a base date with configurable interval
 */
export const calculateNextMeetup = (
  baseDate: string,
  intervalWeeks: number = 2
): Date => {
  const base = new Date(baseDate);
  const now = new Date();

  // If base date is in the future, return it
  if (base > now) {
    return base;
  }

  const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
  const INTERVAL_MS = intervalWeeks * MS_PER_WEEK;
  const timeDiff = now.getTime() - base.getTime();
  const periodsPassed = Math.floor(timeDiff / INTERVAL_MS);

  // Calculate the most recent occurrence
  const currentOccurrence = new Date(
    base.getTime() + periodsPassed * INTERVAL_MS
  );

  // Calculate when the meeting ends (meeting start + 1 hour)
  const meetingEnd = currentOccurrence.getTime() + MEETING_DURATION_MS;

  // If the meeting hasn't ended yet, return current occurrence
  if (now.getTime() < meetingEnd) {
    return currentOccurrence;
  }

  // If meeting has ended, return next occurrence
  return new Date(currentOccurrence.getTime() + INTERVAL_MS);
};

/**
 * Meeting duration in milliseconds (1 hour)
 */
export const MEETING_DURATION_MS = 60 * 60 * 1000;

/**
 * Meeting status enum
 */
export enum MeetingStatus {
  BEFORE_DAY = "before_day",
  STARTING_SOON = "starting_soon",
  ONGOING = "ongoing",
  ENDED = "ended",
}

/**
 * Get meeting status based on current time
 */
export const getMeetingStatus = (meetingDate: Date): MeetingStatus => {
  const now = new Date();
  const meetingStart = meetingDate.getTime();
  const meetingEnd = meetingStart + MEETING_DURATION_MS;
  const currentTime = now.getTime();

  // Check if meeting has ended
  if (currentTime >= meetingEnd) {
    return MeetingStatus.ENDED;
  }

  // Check if meeting is ongoing
  if (currentTime >= meetingStart && currentTime < meetingEnd) {
    return MeetingStatus.ONGOING;
  }

  // Check if it's the same day as the meeting
  const isSameDay =
    now.getUTCFullYear() === meetingDate.getUTCFullYear() &&
    now.getUTCMonth() === meetingDate.getUTCMonth() &&
    now.getUTCDate() === meetingDate.getUTCDate();

  if (isSameDay && currentTime < meetingStart) {
    return MeetingStatus.STARTING_SOON;
  }

  return MeetingStatus.BEFORE_DAY;
};

/**
 * Calculate time until meeting starts
 */
export const getTimeUntilMeeting = (
  meetingDate: Date
): { hours: number; minutes: number } => {
  const now = new Date();
  const diffMs = meetingDate.getTime() - now.getTime();

  if (diffMs <= 0) {
    return { hours: 0, minutes: 0 };
  }

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
};

/**
 * Format countdown message
 */
export const formatCountdown = (meetingDate: Date): string => {
  const { hours, minutes } = getTimeUntilMeeting(meetingDate);

  if (hours === 0 && minutes === 0) {
    return "Starting now";
  }

  if (hours === 0) {
    return `Starting in ${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }

  if (minutes === 0) {
    return `Starting in ${hours} hour${hours !== 1 ? "s" : ""}`;
  }

  return `Starting in ${hours} hour${
    hours !== 1 ? "s" : ""
  } and ${minutes} minute${minutes !== 1 ? "s" : ""}`;
};

/**
 * Check if a given date is today
 */
export const isDateToday = (date: Date): boolean => {
  const now = new Date();
  return (
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate()
  );
};

/**
 * Format date for display with locale support
 */
export const formatMeetupDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };
  return date.toLocaleString(undefined, options);
};

/**
 * Format date for Google Calendar (YYYYMMDDTHHmmssZ)
 */
export const formatGoogleDate = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
};

/**
 * Get day of week abbreviation for recurrence rules (SU, MO, TU, WE, TH, FR, SA)
 */
export const getDayOfWeekCode = (date: Date): string => {
  const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  return days[date.getUTCDay()];
};
