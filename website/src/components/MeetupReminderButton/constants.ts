import meetupSessionsData from "./meetup-sessions.json";
import { MeetupSession } from "./types";

/**
 * Load meetup sessions from JSON configuration file
 * This allows easy updates to session details without code changes
 */
export const DEFAULT_SESSIONS: MeetupSession[] = meetupSessionsData.sessions;

/**
 * Floating "DevEx Sessions" selector. Set to `true` when weekly sessions resume.
 * Kept off while the DevEx WG session series is paused so visitors are not
 * prompted to join meetings that are not running.
 */
export const DEVEX_SESSIONS_ENABLED = false;

