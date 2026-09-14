import meetupSessionsData from "./meetup-sessions.json";
import { MeetupSession } from "./types";

/**
 * Load meetup sessions from JSON configuration file
 * This allows easy updates to session details without code changes
 */
export const DEFAULT_SESSIONS: MeetupSession[] = meetupSessionsData.sessions;

/**
 * Floating "DevEx Sessions" selector.
 * Set to `false` to hide while the WG series is paused.
 */
export const DEVEX_SESSIONS_ENABLED = true;

