Button is the commit control: five variants on a 28, 32 or 40px height, with the primary variant pressing 2px onto a hard lower edge.

You provide a label (`children`) and an `onClick`; `size` is `sm | md | lg`, `variant` is `primary | secondary | ghost | stage | danger`. `stage` tints by the `stage` prop (a stage id).

- Use one `primary` per screen for the single next action. Use `stage` to start a stage-specific step.
- `loading` keeps focus and ignores clicks; set it while a request runs instead of disabling.
- `iconOnly` needs an `aria-label`. Minimum target is 28px.
- Don't use pill shapes, gradients or green for ordinary actions; green means verified.
