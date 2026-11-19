Segmented is a compact radiogroup (filters) or tablist (panes) with roving tabindex.

Props: `options` (`[{value,label}]`), `value`, `onChange`, `label`, `role` (`"radiogroup"` default or `"tablist"`).

- Arrow keys move selection and focus together. Selected shows `bg-selected` with a `brand` edge.
- Use `tablist` only when it switches panes of content.
