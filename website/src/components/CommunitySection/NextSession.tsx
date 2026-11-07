import { DEFAULT_SESSIONS } from '../MeetupReminderButton/constants';
import { calculateNextMeetup } from '../MeetupReminderButton/utils/dateUtils';
import { generateGoogleCalendarUrl } from '../MeetupReminderButton/utils/calendarUtils';
import styles from './styles.module.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Formatted by hand in UTC on purpose: toLocaleDateString can render a different
 * string on the server than in the browser, and this date is the first thing a
 * reader sees, so a hydration mismatch would be visible.
 */
function formatDate(date: Date): string {
  return `${DAYS[date.getUTCDay()]} ${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

function formatTime(date: Date): string {
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes} UTC`;
}

/**
 * The next working-group call, taken from the same calendar data the floating
 * sessions control reads.
 *
 * The date is resolved during the build rather than in an effect, so the card is
 * in the server-rendered markup and the page does not shift when the clock
 * arrives. The cost is that a build that happens just before a call keeps
 * showing it until the next deploy; a build that happens after one has ended
 * moves straight to the next date. Nothing here counts down, because a countdown
 * would have to read the browser clock and would disagree with the markup.
 */
export default function NextSession() {
  const session = DEFAULT_SESSIONS[0];
  if (!session) return null;

  const next = calculateNextMeetup(
    session.baseDate,
    session.recurrence?.interval ?? 2,
    session.endDate,
  );
  if (!next) return null;

  return (
    <div className={styles.sessionCard}>
      <p className={styles.sessionLabel}>Next session</p>
      <h3 className={styles.sessionTitle}>{session.title}</h3>

      <p className={styles.sessionWhen}>
        <time dateTime={next.toISOString()}>{formatDate(next)}</time>
        <span>{formatTime(next)}</span>
      </p>
      <p className={styles.sessionMeta}>Bi-weekly, Thursdays · Google Meet</p>

      <div className={styles.sessionActions}>
        <a href={session.meetupLink} target="_blank" rel="noopener noreferrer">
          Join the call
        </a>
        <a
          href={generateGoogleCalendarUrl(session, next)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Add to calendar
        </a>
      </div>
    </div>
  );
}
