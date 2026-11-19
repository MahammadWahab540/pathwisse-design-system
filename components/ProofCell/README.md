ProofCell is the atomic mark: a 16, 24 or 32px square whose glyph says the stage and whose fill says how much evidence exists.

Props: `stage`, `state` (`locked | available | active | done | verified`), `progress` (0–1, for `active`), `size`, `onClick` (renders a toggle button with `aria-pressed`), `selected`, `label`.

- The accessible name is generated, for example "Practice: In progress, 60%". Locked cells are not interactive.
- `verified` is for Review and Prove only (external attestation) and draws the notch. Learner-completed work is `done`.
- Active fill rises from the bottom, minimum 12%.
