ProjectEvidenceCard presents one piece of work with the reasons to believe it: stage, skills, artifacts and review outcome.

You provide `evidence` as `{id, reference, title, summary, stage, skills:[{id,label}], artifacts:[{kind,label,href?}], review?:{outcome,reviewer?,notes?}, verifiedAt?, createdAt}`; optional `variant` (`default | compact | featured`) and `onOpen`.

- The notch appears only when `verifiedAt` is set.
- With `onOpen` the whole card is one tab stop; artifact links remain separately clickable.
- `skills[].id` joins to a verification record's `skillId`.
