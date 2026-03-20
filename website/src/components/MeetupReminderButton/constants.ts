import meetupSessionsData from "./meetup-sessions.json";
import { MeetupSession } from "./types";

/**
 * Load meetup sessions from JSON configuration file
 * This allows easy updates to session details without code changes
 */
export const DEFAULT_SESSIONS: MeetupSession[] = meetupSessionsData.sessions;
