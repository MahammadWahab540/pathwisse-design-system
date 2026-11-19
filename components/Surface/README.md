Surface is the card and pane container: a 1px bordered, 8px-radius panel on `bg-surface`.

Props: `variant` (`default | flat | inset | raised`), `padding` (`none | sm | md | lg`), `notch`, `as`. You provide the children.

- Use `notch` only for content another person has verified (set `--notch-cut` if the background is not `bg-canvas`).
- Borders carry structure; don't add drop shadows. `raised` is a 1px lower edge only.
