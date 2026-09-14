export interface MeetupSession {
  id: string;
  name: string;
  title: string;
  description: string;
  baseDate: string; // ISO 8601 format (UTC) — first occurrence
  endDate?: string; // ISO 8601 format (UTC) — last allowed occurrence (series ends)
  meetupLink: string;
  recurrence?: {
    interval: number; // Number of weeks between meetings (1 = weekly, 2 = bi-weekly, etc.)
  };
}

export interface MeetupReminderButtonProps {
  sessions?: MeetupSession[];
}
