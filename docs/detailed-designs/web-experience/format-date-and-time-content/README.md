# Format date and time content

## Overview

Saturdaze presents time in family planning, local-event discovery, and administration. A *scheduled local time* is a time of day supplied by a family plan or local event. An *administrative UTC timestamp* is the coordinated universal time of an audit entry or ingestion run.

This feature removes design drift D34. It gives each local scheduled time one `HH:mm` clock, gives each local range one `HH:mm to HH:mm` form, and gives administration one `YYYY-MM-DD HH:mm UTC` form.

## Description

- **`format.ts`** — shared presentation helpers. `hhmm` formats an API `TimeOnly` value as `HH:mm`; `timeRange` joins two local clocks with ` to `.
- **`family-presentation.ts`** and **`weekend-projection.ts`** — project commitment and itinerary labels with shared formatting.
- **`event-submissions.service.ts`** and **`admin-audit.service.ts`** — project event and administrative content for their screens.
- **Angular pages and dialogs** — render typed presentation values without applying a second time format.
- **`docs/mocks/pages`** — records the same content rule in the static visual reference, preserving existing BEM classes and state semantics.

## Requirements

| L2 ID | Refines (L1) | Requirement |
|-------|--------------|-------------|
| `L2-134` | `L1-038` | All user-visible local scheduled times shall use a zero-padded 24-hour `HH:mm` clock. A same-day range shall join two clocks with ` to `. A date and time shall join its date and clock with ` · `. Administrative timestamps shall use `YYYY-MM-DD HH:mm UTC`. |

## Diagrams

### System context

A family member reads local schedule times in Saturdaze. An administrator reads UTC audit times in the same product.

![C4 system context for formatting date and time content](diagrams/c4-context.png)

### Containers

The Angular applications receive typed data from the API and render presentation values from the shared API library.

![C4 container view for formatting date and time content](diagrams/c4-container.png)

### Components

The shared format module supplies local clocks and ranges to family, weekend, event, and administration projections.

![C4 component view for formatting date and time content](diagrams/c4-component.png)

### Class structure

The presentation services depend on the shared formatting functions and return strings to their views.

![Class diagram for formatting date and time content](diagrams/class-structure.png)

### Behaviour — render a scheduled range

The Weekend projection applies `L2-134` before the page renders a scheduled range.

![Sequence diagram for rendering a scheduled range](diagrams/sequence-scheduled-range.png)

### Behaviour — render an administrative timestamp

The administration service applies the UTC timestamp rule in `L2-134` before the page renders an audit entry.

![Sequence diagram for rendering an administrative timestamp](diagrams/sequence-admin-timestamp.png)
