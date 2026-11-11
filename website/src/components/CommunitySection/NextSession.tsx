import Link from '@docusaurus/Link';
import { DEFAULT_SESSIONS, DEVEX_SESSIONS_ENABLED } from '../MeetupReminderButton/constants';
import { calculateNextMeetup } from '../MeetupReminderButton/utils/dateUtils';
import { generateGoogleCalendarUrl } from '../MeetupReminderButton/utils/calendarUtils';
import styles from './styles.module.css';

const SESSIONS_ARCHIVE = '/docs/working-group/';

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
 * The date is resolved during render so the card is in the server markup.
 * suppressHydrationWarning is on the date and time only: a visit that falls
 * in a later fortnight can show the next date without a recoverable hydration
 * error. Nothing here counts down.
 */
function StatusCard({
  label,
  title,
  copy,
}: {
  label: string;
  title: string;
  copy: string;
}) {
  return (
    <div className={styles.sessionCard}>
      <p className={styles.sessionLabelQuiet}>{label}</p>
      <h3 className={styles.sessionTitle}>{title}</h3>
      <p className={styles.sessionMeta}>{copy}</p>
      <div className={styles.sessionActions}>
        <Link to={SESSIONS_ARCHIVE}>Browse the sessions</Link>
      </div>
    </div>
  );
}

export default function NextSession() {
  const session = DEFAULT_SESSIONS[0];
  if (!session) return null;

  if (!DEVEX_SESSIONS_ENABLED) {
    return (
      <StatusCard
        label="Paused"
        title="The working group series is paused"
        copy="The sessions control is hidden for the same reason. Notes from past calls stay in the archive."
      />
    );
  }

  const next = calculateNextMeetup(
    session.baseDate,
    session.recurrence?.interval ?? 2,
    session.endDate,
  );
  if (!next) {
    return (
      <StatusCard
        label="Archive"
        title="This series has no further date"
        copy="Notes from past calls stay in the archive."
      />
    );
  }

  return (
    <div className={styles.sessionCard}>
      <p className={styles.sessionLabel}>Next session</p>
      <h3 className={styles.sessionTitle}>{session.title}</h3>

      <p className={styles.sessionWhen}>
        <time suppressHydrationWarning dateTime={next.toISOString()}>
          {formatDate(next)}
        </time>
        <span suppressHydrationWarning>{formatTime(next)}</span>
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
