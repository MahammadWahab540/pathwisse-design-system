Field is a labelled text input or textarea with a hint and an announced error.

Props: `label` (always visible), `hint`, `error`, `multiline`, plus any input attributes (`value`, `onChange`, `disabled`).

- The error is rendered with `role="alert"` and linked by `aria-describedby`; the input gets `aria-invalid`.
- Never replace the visible label with a placeholder.
