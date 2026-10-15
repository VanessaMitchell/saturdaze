# 29 · Scheduled times that read the same everywhere

> **Runtime:** ~4.9 min · **Audience:** Saturdaze contributors · **Prerequisites:** none

**Video:** [29-scheduled-time-format.mp4](29-scheduled-time-format.mp4) · [Slides](slides.html) · **Audio:** [29-scheduled-time-format.mp3](29-scheduled-time-format.mp3) · [Transcript](script.md) · [Clips](clips/clips.mjs)

## Why this video exists

Issue #72 standardizes how scheduled local times and administrative UTC timestamps appear. The video shows the inconsistent before state, the shared formatting rule, and the same landing preview after the change.

## Learning objectives

By the end, the viewer can:

- State the required format for a local clock, a same-day range, a date with a clock, and a UTC timestamp.
- Find the shared formatter and the projections that use it.
- Explain how the app's visible time changes without changing the schedule itself.

## Key questions

| Question | What a strong answer includes |
|----------|-------------------------------|
| How is a local clock written? | Zero-padded 24-hour `HH:mm`, such as `09:05`. |
| How is a same-day range written? | `HH:mm to HH:mm`, such as `09:05 to 13:00`. |
| How is a date joined to its clock? | With ` · `, including for both dates of a cross-day event. |
| How is an administrative timestamp written? | `YYYY-MM-DD HH:mm UTC`, using UTC fields. |

## Code / assets on screen

| File | What to show |
|------|--------------|
| `frontend/projects/api/src/lib/api/format.ts` | `hhmm` zero-padding and `timeRange` composition. |
| `frontend/projects/api/src/lib/services/event-submissions.service.ts` | Date and clock separators for same-day and cross-day events. |
| `frontend/projects/api/src/lib/services/admin-audit.service.ts` | UTC timestamp normalization through `utcStamp`. |
| `frontend/projects/saturdaze/src/app/pages/landing/landing-sample.ts` | Fixed sample schedule shown in both recorded builds. |
| `docs/specs/L2.md` | L2-134 and its acceptance criteria. |

## Run sheet

| Time | Segment | Content |
|------|---------|---------|
| 00:00-00:28 | Introduction | Why one schedule had several time styles. |
| 00:28-01:03 | What went wrong | Different strings for the same scheduled information. |
| 01:03-01:56 | The rule | Clock, range, date separator and UTC format. |
| 01:56-02:44 | The implementation | Shared formatters and projections. |
| 02:44-03:35 | Where it appears | Event dates and administrative timestamps. |
| 03:35-04:13 | Before and after | The landing preview in both production builds. |
| 04:13-04:31 | Verification | Acceptance coverage and viewport checks. |
| 04:31-04:51 | Recap | One rule, shared formatters, stable schedule data. |

## Demo commands

```sh
# Build the checked-in baseline and the updated app, then serve them on :4401 and :4402.
git worktree add --detach /tmp/saturdaze-time-before HEAD
ln -s "$PWD/frontend/node_modules" /tmp/saturdaze-time-before/frontend/node_modules
(cd /tmp/saturdaze-time-before/frontend && node_modules/.bin/ng build saturdaze --configuration production)
(cd frontend && npx ng build saturdaze --configuration production)

# In separate terminals, from e2e:
npx http-server ../frontend/dist/saturdaze/browser -p 4402 -c-1 --silent
npx http-server /tmp/saturdaze-time-before/frontend/dist/saturdaze/browser -p 4401 -c-1 --silent

# From the repository root:
node tools/video-record/record-clips.mjs docs/videos/29-scheduled-time-format
node tools/video-audio/generate-audio.mjs docs/videos/29-scheduled-time-format --dry-run
node tools/video-audio/generate-audio.mjs docs/videos/29-scheduled-time-format
node tools/video-build/build-video.mjs docs/videos/29-scheduled-time-format --check
node tools/video-build/build-video.mjs docs/videos/29-scheduled-time-format --slides-only
node tools/video-build/build-video.mjs docs/videos/29-scheduled-time-format

# Remove the temporary baseline worktree after recording:
git worktree remove /tmp/saturdaze-time-before
```

## Pitfalls

- Do not convert UTC administrative stamps with the machine's local timezone.
- Keep date and clock separators consistent on both sides of a cross-day event.
- The recordings use separate production builds so the before state is real application output, not edited screenshots.

## References

- [L2-134: Scheduled times use one 24-hour content format](../../specs/L2.md#l2-134-scheduled-times-use-one-24-hour-content-format)
- [ADR-010: Visual parity policy](../../adr/ADR-010-visual-parity-policy.md)
