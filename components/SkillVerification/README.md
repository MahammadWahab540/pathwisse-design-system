SkillVerification is a verifiable claim, not a badge: it states the method, issuer, level and criteria behind a skill.

You provide `record` as `{id, skillId, skillLabel, level, levels, levelLabel, method, issuer, credentialId?, issuedAt?, expiresAt?, status, criteria:[{label,met}], evidenceCount, shareUrl?}`; optional `variant` (`card | row`), `onCopy`, `onRequest`.

- Status stamps: `verified` solid green on tint, `pending` dashed amber, `expired` dashed neutral. The stamp animates once on verify.
- Show *Copy verification link* only when verified with a share URL; *Request review* only when neither verified nor pending.
- Each criterion carries a visually-hidden "Met/Not met" word.
