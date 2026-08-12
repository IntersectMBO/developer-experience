# Issue & PR Triage Cadence

This document defines how issues and pull requests in this repository are triaged, how often, and by whom. It exists so contributors know what to expect and maintainers share one consistent process.

## Cadence

| Activity | Frequency | When |
| --- | --- | --- |
| Triage new issues and PRs | Weekly | Ahead of each Developer Experience Working Group session |
| Review open PRs | Within 48 hours of submission | Rolling |
| Revisit stale items | Monthly | First week of each month |

Triage happens alongside the weekly working group sessions, so newly raised items are discussed while the group is already together.

## Triage checklist

For every new issue or PR, the triaging maintainer:

1. **Acknowledge** — leave a short comment thanking the contributor and setting expectations.
2. **Label** — apply at least one type label (`documentation`, `enhancement`, `bug`) and, where useful, a status label (`triage`, `needs-info`, `good first issue`, `help wanted`).
3. **Assess scope** — small, well-defined items can be approved on the spot; larger proposals are routed to a Developer Advocate for discussion, per the [submission process](CONTRIBUTING.md#submission-process).
4. **Assign or park** — assign an owner, or mark `help wanted` / `good first issue` for community pickup.
5. **Link work** — ensure every PR is linked back to its issue.

## Labels

| Label | Meaning |
| --- | --- |
| `triage` | New item not yet reviewed by a maintainer |
| `needs-info` | Waiting on the reporter for details; may go stale if unanswered |
| `good first issue` | Suitable for newcomers |
| `help wanted` | Maintainers would like community help here |
| `stale` | Applied automatically after prolonged inactivity (see automation below) |
| `pinned` | Exempt from stale automation |

## Response-time expectations (SLAs)

- **New issues**: first maintainer response within **1 week**.
- **New PRs**: first review within **48 hours**, as stated in `CONTRIBUTING.md`.
- **Agreed work**: PR submitted within **1 week** of scope agreement, per `CONTRIBUTING.md`.

## Stale automation

The [`stale.yml`](.github/workflows/stale.yml) workflow enforces the inactivity part of this cadence:

- **Issues** are marked `stale` after **30 days** without activity and closed **14 days** later if still inactive.
- **PRs** are marked `stale` after **21 days** without activity and closed **7 days** later if still inactive.
- Items labelled `pinned` or `security` are never marked stale.
- Any comment or update resets the clock.

## Roles

- **Triagers**: Developer Advocates and the repository maintainers listed in [CODEOWNERS](CODEOWNERS).
- **Escalation**: Scope or priority disagreements are resolved in the weekly working-group session.
