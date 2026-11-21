# Learner app screens: reference spec

Additive docs only. Nothing in `tokens.css`, `tokens.json` or `components/` (ProofOS) is changed.

The 24 approved learner-app screens (laptop 1440px, tablet reflow, no mobile) were designed in a different visual language from ProofOS: Inter and JetBrains Mono, violet `#5B4BF0`, pill buttons with a hard bottom shadow. This folder records what was measured from those screens so the two can be reconciled deliberately.

- `SPEC.md`: build spec for the 24 screens, with measured tokens.
- `PROMPT.md`: instruction prompt for an agent building the screens, including the default scale rule (rem everywhere, `html { font-size: 80% }`).

## Known differences from ProofOS

| Area | ProofOS (this repo) | Screens |
|---|---|---|
| Font | Geist, Geist Mono | Inter, JetBrains Mono |
| Brand | navy | violet #5B4BF0, dark button #222226 |
| Buttons | 6px radius, no pills | pill (r20 / r28) |
| Radius | max 8px | 16 distinct values |
| Elevation | borders first, 1px edge | 20 shadow recipes |

Decision needed before building: which language wins. Until then, treat ProofOS as the code source of truth and these files as design reference.
