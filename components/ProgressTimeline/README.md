ProgressTimeline lists what the learner actually did, newest first, grouped by day.

You provide `events` as `[{id, stage, title, detail?, at, ref?}]`; optional `variant` (`default | compact`), `onOpen` (events with a `ref` become buttons) and `now` (injectable for testing).

- `prove` events render as `verified` cells; all others as `done`.
- Dates and times use `Intl`, so they follow locale. Don't add streak counters.
