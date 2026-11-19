CapabilityTrail shows every capability and where it sits on the five stages: a ledger, a compact rail or a focus view of one capability.

You provide `capabilities` as `[{id, title, summary?, stages:[{stage, state, progress?, detail?}] ×5 in order, nextLessonId?}]`. Optional `variant` (`ledger | compact | focus`), `selectedId`, `onSelect`.

- Status text ("Practice · 60%", "Proven", "Not started") is derived by `summarizeCapability`; never store it.
- A solid link joins settled stages; a dashed link means ground still ahead.
- Below 720px the ledger header hides and rows stack.
