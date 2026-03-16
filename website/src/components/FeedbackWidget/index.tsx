import React, { useState } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function FeedbackWidget() {
  const { siteConfig } = useDocusaurusContext();
  const GOOGLE_SCRIPT_URL = siteConfig.customFields?.googleScriptUrl as string;
  
  const [vote, setVote] = useState<null | 'yes' | 'no'>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleVote = (value: 'yes' | 'no') => {
    setVote(value);
    if (value === 'yes') {
       submitFeedback(value, '');
    }
  };

  const submitFeedback = async (voteValue: string, commentValue: string) => {
    setSubmitting(true);
    try {
      const data = {
        url: window.location.href, 
        vote: voteValue,
        comment: commentValue,
        userAgent: navigator.userAgent,
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      setSubmitted(true);
    } catch (error) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vote) {
      submitFeedback(vote, comment);
    }
  };

  if (submitted) {
    return (
      <div className="feedback-container">
        <div className="feedback-widget">
          <p className="thank-you">Thanks for your feedback! 🙏🏽</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <div className="feedback-widget">
        {!vote ? (
          <div className="initial-state">
            <span className="question">Was this helpful?</span>
            <div className="buttons">
              <button
                className={clsx("button", "thumbs-up")}
                onClick={() => handleVote('yes')}
                aria-label="Yes"
              >
                👍 Yes
              </button>
              <button
                className={clsx("button", "thumbs-down")}
                onClick={() => setVote('no')}
                aria-label="No"
              >
                👎 No
              </button>
            </div>
          </div>
        ) : (
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <p className="follow-up">
              {vote === 'yes' ? 'What was most helpful?' : 'How can we improve this page?'}
            </p>
            <textarea
              className="textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={vote === 'yes' ? "Optional comments..." : "Please tell us what's missing or unclear..."}
              rows={3}
            />
            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setVote(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-button"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send Feedback'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
