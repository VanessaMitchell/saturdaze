# 29 · Scheduled times that read the same everywhere

One weekend plan can be correct and still be harder to scan than it needs to be. A clock without a leading zero, a range with a suffix on just one side, and an event date written differently from the time all make people stop and interpret what should be familiar. This video follows issue seventy-two: one readable format for local scheduled times, and a separate, explicit format for administrative UTC timestamps.

## What went wrong

Before this change, the same family could see “9:00,” “9:00pm,” and “9:00 to 10:00pm” across a plan, a dialog, and a confirmation. Some event subtitles put a date beside a time without the separator used elsewhere. Administrative activity used a human date and a comma, even though the system event is a UTC timestamp.

Those are not different schedules. They are different renderings of the same kind of information. The fix is a content rule, not a change to how the planner chooses activities or stores times.

## The one rule

The content rule is simple: local scheduled clocks are zero-padded and use the twenty-four-hour form, H H colon M M. That makes nine oh five `09:05`, and five in the evening `17:00`. A same-day range joins two clocks with the word “to”, as in `09:05 to 13:00`. It does not add A M or P M.

When a date appears with a clock, a middle dot separates them: `Sat 20 Jun · 14:00`. For an event spanning dates, each date keeps its own separator and clock. Administrative timestamps are different: they use year, month, day, a space, hour and minute, and the literal `UTC`, for example `2026-10-06 14:02 UTC`.

## The shared formatter

The shared formatter lives in `frontend/projects/api/src/lib/api/format.ts`. It turns a backend time into a padded clock, then builds a range by composing two clocks with the same separator. Family commitments, weekend blocks, errands, restaurants, and event submissions use these helpers rather than making local formatting choices.

The important detail is that formatting does not alter the schedule. `09:00` and `9:00` mean the same moment; the new formatter only makes the display predictable. Durations, ordering, time-zone interpretation, and planner decisions stay as they were.

## Where it appears

Event submissions use the same range for a single date. When an event crosses midnight, the start date and clock stay together, and the end date and clock stay together too. This avoids a range that could be mistaken for two clocks on one day.

The admin audit projection uses UTC getters and zero-pads every part of the date and time. It then labels the result `UTC`. That is intentional: an audit record should not change when an administrator opens it in a different local time zone.

The same rule reaches the family page, the weekend plan, confirmation dialogs, placement previews, event and restaurant subtitles, and the design examples. L2-134 names those surfaces and checks that the format remains visible at the supported viewport widths.

## Before and after

Here is the checked-in production build before the change. The landing preview shows the same Saturday and Sunday schedule, with single-digit hours written without a leading zero. Notice the swim lesson at nine, then pancakes at eight thirty and the Costco run at nine fifteen.

Now the updated production build shows the same schedule in the same place. The clocks read `09:00`, `08:30`, and `09:15`. The activities, order, durations, and layout are unchanged; only the written form of the time is consistent.

## Verification

The formatter and projections have focused unit coverage, and the landing preview has a Playwright acceptance check at mobile, tablet, and desktop widths. The dialog gallery also checks the displayed schedule ranges. These tests assert the text people see, not the shape of the code.

## Recap

Keep the rule small. Use zero-padded twenty-four-hour clocks for local scheduled times, “to” for a same-day range, and a middle dot between a date and its clock. Keep administrative timestamps explicitly in UTC. Shared formatters make that one decision consistent across the app.
