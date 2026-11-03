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
- Items labelled `pinned` or `Security` are never marked stale.
- Any comment or update resets the clock.

## Security scanning

Two automated scanners run on this repository, and their findings are triaged in the same weekly session as issues and PRs:

- **Dependabot** (`.github/dependabot.yml`) — checks npm dependencies in `website/` and the GitHub Actions used by the workflows, weekly on Mondays. Alerts and update PRs appear under **Security → Dependabot** and as `dependencies`-labelled PRs.
- **CodeQL** (`.github/workflows/codeql.yml`) — static analysis (SAST) of the JavaScript/TypeScript sources and, via the `actions` language, of the workflow files under `.github/workflows/`, on every push and pull request to `main`, plus a weekly scheduled run on Mondays. Results appear under **Security → Code scanning**.

Items labelled `Security` are never marked stale (see automation above), so a scanning alert stays visible until a maintainer closes it as fixed or dismissed with a reason.

### Dismissing a code scanning alert

Only a maintainer (a triager listed under [Roles](#roles) with write access) may dismiss a code scanning alert. Contributors can propose a dismissal in a comment, but the dismissal itself is a maintainer action.

Acceptable dismissal reasons — use the matching GitHub reason code:

| Reason code | When it applies |
| --- | --- |
| `false positive` | The flagged pattern cannot occur as written — e.g. the value CodeQL tracks is a constant, or the sink is unreachable in this code. The dismissal comment must say why. |
| `won't fix` | The finding is real but the risk is accepted — e.g. a low-severity pattern in a build script that never handles untrusted input. The comment must record the reasoning and who accepted the risk. |
| `used in tests` | The flagged code exists only in test fixtures or test helpers and never ships or runs against real input. |

Not acceptable: dismissing an alert because fixing it is inconvenient, because the deadline is close, or without a comment explaining the case. If none of the three reason codes honestly fits, the alert stays open and gets fixed. Dismissals are revisited in the monthly stale-item review; a dismissal whose reasoning no longer holds is reopened.

## Roles

- **Triagers**: Developer Advocates and the repository maintainers listed in [CODEOWNERS](CODEOWNERS).
- **Escalation**: Scope or priority disagreements are resolved in the weekly working-group session.

---

Thank you for helping make Cardano more accessible to developers worldwide! 🚀

*For questions about contributing, first become a member at [Intersect](https://www.intersectmbo.org/) and register at [members.intersectmbo.org](https://members.intersectmbo.org/registration) to get voting rights and access to our Discord community's #developer-experience channel. See our [Intersect Membership Guide](website/docs/intersect-membership-guide.md) for all membership benefits.*
