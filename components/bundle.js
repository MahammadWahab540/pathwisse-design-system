/* @ds-bundle: {"format":4,"namespace":"Pathwisse","components":[{"name":"Button"},{"name":"Tag"},{"name":"Surface"},{"name":"Section"},{"name":"Field"},{"name":"Segmented"},{"name":"Meter"},{"name":"Pips"},{"name":"Kbd"},{"name":"ProofCell"},{"name":"CapabilityTrail"},{"name":"ProjectEvidenceCard"},{"name":"SkillVerification"},{"name":"ProgressTimeline"},{"name":"LadderMark"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  var useState = React.useState, useRef = React.useRef;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }

  var STAGES = [
    { id: "learn", label: "Learn", question: "Do I understand it?" },
    { id: "practice", label: "Practice", question: "Can I do it unaided?" },
    { id: "build", label: "Build", question: "Can I ship it?" },
    { id: "review", label: "Review", question: "Does it hold up?" },
    { id: "prove", label: "Prove", question: "Can others trust it?" }
  ];
  function stageLabel(id) { for (var i = 0; i < STAGES.length; i++) if (STAGES[i].id === id) return STAGES[i].label; return id; }

  var GLYPHS = {
    learn: [["path", { d: "M1.5 2.5h3.2c.8 0 1.3.5 1.3 1.2V10c0-.6-.5-1-1.3-1H1.5zM10.5 2.5H7.3C6.5 2.5 6 3 6 3.7V10c0-.6.5-1 1.3-1h3.2z" }]],
    practice: [["circle", { cx: 6, cy: 6, r: 3.5 }]],
    build: [["rect", { x: 1.5, y: 7, width: 4, height: 3.5 }], ["rect", { x: 6.5, y: 7, width: 4, height: 3.5 }], ["rect", { x: 4, y: 2.5, width: 4, height: 3.5 }]],
    review: [["path", { d: "M2 2.5h8v5.5H6.2L4 10V8H2z" }]],
    prove: [["path", { d: "M2.5 6.5L5 9l4.5-5.5" }]]
  };
  function StageGlyph(p) {
    var size = p.size || 12;
    return h("svg", { className: "pw-glyph", width: size, height: size, viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", strokeWidth: 1.25, strokeLinejoin: "round", strokeLinecap: "round", "aria-hidden": "true", focusable: "false" },
      (GLYPHS[p.stage] || []).map(function (g, i) { return h(g[0], Object.assign({ key: i }, g[1])); }));
  }

  function Button(p) {
    var variant = p.variant || "secondary", size = p.size || "md";
    var rest = Object.assign({}, p); ["variant", "size", "stage", "block", "iconOnly", "loading", "children", "className"].forEach(function (k) { delete rest[k]; });
    return h("button", Object.assign({ type: "button", "data-stage": p.stage, className: cx("pw-root", "pw-btn", "pw-btn--" + variant, size !== "md" && "pw-btn--" + size, p.block && "pw-btn--block", p.iconOnly && "pw-btn--icon", p.className), "aria-busy": p.loading ? "true" : undefined, onClick: p.loading ? function (e) { e.preventDefault(); } : p.onClick }, rest, { onClick: p.loading ? function (e) { e.preventDefault(); } : p.onClick }),
      h("span", { className: "pw-btn__label", style: { display: "inline-flex", alignItems: "center", gap: 8 } }, p.children));
  }

  function Tag(p) {
    var tone = p.stage ? "stage" : (p.tone || "neutral");
    return h("span", { className: cx("pw-root", "pw-tag", "pw-tag--" + tone, p.className), "data-stage": p.stage },
      p.stage ? h(StageGlyph, { stage: p.stage, size: 12 }) : null, p.children != null ? p.children : (p.stage ? stageLabel(p.stage) : null));
  }

  function Surface(p) {
    var Tagname = p.as || "div";
    var rest = Object.assign({}, p); ["as", "variant", "padding", "notch", "children", "className"].forEach(function (k) { delete rest[k]; });
    return h(Tagname, Object.assign({ className: cx("pw-root", "pw-surface", p.variant && p.variant !== "default" && "pw-surface--" + p.variant, "pw-surface--p-" + (p.padding === "none" ? "x" : (p.padding || "md")), p.notch && "pw-surface--notch", p.className) }, rest), p.children);
  }

  function Section(p) {
    return h("section", { className: "pw-root pw-section", "aria-label": typeof p.title === "string" ? p.title : undefined },
      h("header", { className: "pw-section__head" },
        h("div", null,
          h("div", { className: "pw-label" }, [p.index, p.eyebrow].filter(Boolean).join(" / ")),
          h("h2", { className: "pw-section__title" }, p.title)),
        p.actions ? h("div", null, p.actions) : null),
      p.children);
  }

  var uid = 0;
  function Field(p) {
    var ref = useRef(null); if (!ref.current) ref.current = "pw-f" + (++uid);
    var id = p.id || ref.current;
    var describedBy = [p.hint ? id + "-hint" : null, p.error ? id + "-err" : null].filter(Boolean).join(" ") || undefined;
    var rest = Object.assign({}, p); ["label", "hint", "error", "multiline", "id", "className"].forEach(function (k) { delete rest[k]; });
    var control = h(p.multiline ? "textarea" : "input", Object.assign({ id: id, className: "pw-input", "aria-invalid": p.error ? "true" : undefined, "aria-describedby": describedBy }, rest));
    return h("div", { className: cx("pw-root", "pw-field", p.className) },
      h("label", { className: "pw-field__label", htmlFor: id }, p.label),
      control,
      p.hint ? h("div", { id: id + "-hint", className: "pw-field__hint" }, p.hint) : null,
      p.error ? h("div", { id: id + "-err", className: "pw-field__error", role: "alert" }, p.error) : null);
  }

  function Segmented(p) {
    var mode = p.role === "tablist" ? "tablist" : "radiogroup";
    var opts = p.options;
    function move(i, d, e) {
      var n = (i + d + opts.length) % opts.length;
      p.onChange && p.onChange(opts[n].value);
      var btns = e.currentTarget.parentNode.querySelectorAll("button"); btns[n] && btns[n].focus();
    }
    return h("div", { className: "pw-root pw-seg", role: mode, "aria-label": p.label },
      opts.map(function (o, i) {
        var sel = o.value === p.value;
        var attrs = mode === "tablist" ? { role: "tab", "aria-selected": sel } : { role: "radio", "aria-checked": sel };
        return h("button", Object.assign({ key: o.value, type: "button", className: "pw-seg__item", tabIndex: sel ? 0 : -1, onClick: function () { p.onChange && p.onChange(o.value); },
          onKeyDown: function (e) { if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); move(i, 1, e); } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); move(i, -1, e); } } }, attrs), o.label);
      }));
  }

  function Meter(p) {
    var max = p.max || 100, pct = Math.max(0, Math.min(100, (p.value / max) * 100));
    return h("div", { className: "pw-root pw-meter", "data-stage": p.stage },
      h("div", { className: "pw-meter__track", role: "progressbar", "aria-label": p.label, "aria-valuenow": Math.round(p.value), "aria-valuemin": 0, "aria-valuemax": max },
        h("div", { className: "pw-meter__fill", style: { width: pct + "%" } })),
      p.showValue ? h("span", { className: "pw-mono pw-num", style: { fontSize: 12, color: "var(--text-tertiary)" } }, Math.round(pct) + "%") : null);
  }

  function Pips(p) {
    var levels = p.levels || 5, items = [];
    for (var i = 0; i < levels; i++) items.push(h("span", { key: i, className: cx("pw-pip", i < p.level && "pw-pip--on") }));
    return h("span", { className: "pw-root pw-pips", "data-stage": p.stage || "review", role: "img", "aria-label": p.label || ("Level " + p.level + " of " + levels) }, items);
  }

  function Kbd(p) { return h("kbd", { className: "pw-root pw-kbd" }, p.children); }

  var STATE_TEXT = { locked: "Locked", available: "Available", active: "In progress", done: "Done", verified: "Verified" };
  function cellLabel(stage, state, progress) {
    var t = stageLabel(stage) + ": " + STATE_TEXT[state];
    if (state === "active" && progress != null) t += ", " + Math.round(progress * 100) + "%";
    return t;
  }
  function ProofCell(p) {
    var size = p.size || 24, state = p.state || "available";
    var pr = p.progress == null ? 0.5 : p.progress;
    var label = p.label || cellLabel(p.stage, state, state === "active" ? pr : null);
    var cls = cx("pw-root", "pw-cell", "pw-cell--" + size, "pw-cell--" + state);
    var inner = [
      state === "active" ? h("span", { key: "f", className: "pw-cell__fill", style: { height: Math.max(12, Math.round(pr * 100)) + "%" }, "aria-hidden": "true" }) : null,
      h(StageGlyph, { key: "g", stage: p.stage, size: size === 16 ? 10 : 12 })
    ];
    if (p.onClick && state !== "locked") return h("button", { type: "button", className: cls, "data-stage": p.stage, "aria-pressed": !!p.selected, "aria-label": label, title: label, onClick: p.onClick }, inner);
    return h("span", { className: cls, "data-stage": p.stage, role: "img", "aria-label": label, title: label }, inner);
  }

  function summarizeCapability(cap) {
    var stages = cap.stages, last = stages[stages.length - 1];
    if (last && last.state === "verified") return { text: "Proven", proven: true };
    for (var i = stages.length - 1; i >= 0; i--) {
      var s = stages[i];
      if (s.state === "active") return { text: stageLabel(s.stage) + (s.progress != null ? " · " + Math.round(s.progress * 100) + "%" : "") };
      if (s.state === "done" || s.state === "verified") return { text: stageLabel(s.stage) + " done" };
    }
    return { text: "Not started" };
  }
  function settled(s) { return s.state === "done" || s.state === "verified"; }

  function Rail(p) {
    var cap = p.cap, out = [];
    cap.stages.forEach(function (s, i) {
      if (i > 0) out.push(h("span", { key: "l" + i, className: cx("pw-rail__link", settled(cap.stages[i - 1]) ? "pw-rail__link--solid" : "pw-rail__link--dashed"), "aria-hidden": "true" }));
      out.push(h(ProofCell, { key: s.stage, stage: s.stage, state: s.state, progress: s.progress, size: p.size || 24 }));
    });
    return h("div", { className: cx("pw-rail", p.compact && "pw-rail--compact"), role: "group", "aria-label": cap.title + ": stage progress" }, out);
  }

  function CapabilityTrail(p) {
    var caps = p.capabilities, variant = p.variant || "ledger";
    if (variant === "compact") return h("div", { className: "pw-root" }, h(Rail, { cap: caps[0], compact: true, size: 16 }));
    if (variant === "focus") {
      var cap = caps[0];
      return h("div", { className: "pw-root pw-focus" }, cap.stages.map(function (s) {
        return h("div", { key: s.stage, className: "pw-focus__item", "data-stage": s.stage },
          h(ProofCell, { stage: s.stage, state: s.state, progress: s.progress, size: 32 }),
          h("div", null,
            h("div", { className: "t-h3", style: { font: "600 14px/20px var(--font-sans)" } }, stageLabel(s.stage)),
            s.detail ? h("p", null, s.detail) : null,
            s.state === "active" ? h("div", { style: { marginTop: 8, maxWidth: 240 } }, h(Meter, { value: (s.progress || 0) * 100, stage: s.stage, label: stageLabel(s.stage) + " progress" })) : null),
          h("span", { className: "pw-label" }, STATE_TEXT[s.state]));
      }));
    }
    return h("div", { className: "pw-root" },
      h("div", { className: "pw-trail", role: "list" },
        h("div", { className: "pw-trail__head", "aria-hidden": "true" },
          h("span", { className: "pw-label" }, "No."), h("span", { className: "pw-label" }, "Capability"),
          h("span", { className: "pw-trail__stagehead pw-label" }, STAGES.map(function (s, i) { return h("span", { key: s.id, style: { width: i < 4 ? 64 : 24 } }, s.label); })),
          h("span", { className: "pw-label" }, "Status")),
        caps.map(function (c, i) {
          var sel = p.selectedId === c.id, st = summarizeCapability(c);
          var title = p.onSelect ? h("button", { type: "button", className: "pw-trail__title", "aria-current": sel ? "true" : undefined, onClick: function () { p.onSelect(c); } }, c.title) : h("h3", { className: "pw-trail__title" }, c.title);
          return h("div", { key: c.id, role: "listitem", className: cx("pw-trail__row", sel && "pw-trail__row--sel") },
            h("span", { className: "pw-label pw-num" }, (i < 9 ? "0" : "") + (i + 1)),
            h("div", null, title, c.summary ? h("p", { className: "pw-trail__summary" }, c.summary) : null),
            h(Rail, { cap: c }),
            h("span", { className: "pw-trail__status", "data-proven": st.proven ? "true" : undefined }, st.text));
        })));
  }

  function fmtDate(iso) { try { return new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso)); } catch (e) { return iso; } }

  function ProjectEvidenceCard(p) {
    var ev = p.evidence, variant = p.variant || "default", r = ev.review;
    var title = p.onOpen ? h("button", { type: "button", onClick: function () { p.onOpen(ev); } }, ev.title) : ev.title;
    var foot = [];
    if (r) {
      foot.push(h("span", { key: "o" }, r.outcome));
      if (r.reviewer) foot.push(h("span", { key: "r" }, r.reviewer));
      if (r.notes != null) foot.push(h("span", { key: "n" }, r.notes + (r.notes === 1 ? " note" : " notes")));
    }
    foot.push(h("span", { key: "d" }, fmtDate(ev.verifiedAt || ev.createdAt)));
    return h(Surface, { notch: !!ev.verifiedAt, className: cx("pw-ev", "pw-ev--" + variant, p.onOpen && "pw-ev--open") },
      h("div", { className: "pw-ev__top" }, h(Tag, { stage: ev.stage }), h("span", { className: "pw-label" }, ev.reference)),
      h("h3", { className: "pw-ev__title" }, title),
      variant === "compact" ? null : h("p", { className: "pw-ev__summary" }, ev.summary),
      ev.skills && ev.skills.length ? h("div", { className: "pw-ev__tags" }, ev.skills.map(function (s) { return h(Tag, { key: s.id, tone: "quiet" }, s.label); })) : null,
      variant === "compact" || !ev.artifacts || !ev.artifacts.length ? null : h("ul", { className: "pw-ev__artifacts" }, ev.artifacts.map(function (a, i) {
        return h("li", { key: i }, h("span", { className: "pw-label" }, a.kind), a.href ? h("a", { href: a.href, target: "_blank", rel: "noreferrer" }, a.label) : h("span", null, a.label));
      })),
      h("div", { className: "pw-ev__foot" }, foot));
  }

  var STAMP = { verified: "Verified", pending: "Pending", expired: "Expired" };
  function SkillVerification(p) {
    var r = p.record, variant = p.variant || "card";
    var stamp = h("span", { className: "pw-stamp pw-stamp--" + r.status }, h(StageGlyph, { stage: r.status === "verified" ? "prove" : "review", size: 12 }), STAMP[r.status]);
    if (variant === "row") {
      return h("div", { className: "pw-root pw-svrow" }, h("div", null, h("strong", null, r.skillLabel), h("span", null, r.method)), stamp, h(Pips, { level: r.level, levels: r.levels, stage: "review", label: "Level " + r.level + " of " + r.levels }));
    }
    var met = r.criteria.filter(function (c) { return c.met; }).length;
    var rows = [["Method", r.method], ["Issuer", r.issuer]];
    if (r.issuedAt) rows.push(["Issued", fmtDate(r.issuedAt)]);
    if (r.expiresAt) rows.push(["Expires", fmtDate(r.expiresAt)]);
    rows.push(["Evidence", r.evidenceCount + (r.evidenceCount === 1 ? " artifact" : " artifacts")]);
    var actions = [];
    if (r.status === "verified" && r.shareUrl) actions.push(h(Button, { key: "c", size: "sm", onClick: function () { p.onCopy && p.onCopy(r); } }, "Copy verification link"));
    if (r.status !== "verified" && r.status !== "pending") actions.push(h(Button, { key: "q", size: "sm", variant: "primary", onClick: function () { p.onRequest && p.onRequest(r); } }, "Request review"));
    return h(Surface, { notch: r.status === "verified", className: "pw-sv", padding: "lg" },
      h("div", { className: "pw-sv__head" }, h("h3", { className: "pw-sv__skill" }, r.skillLabel), stamp),
      h("div", { className: "pw-sv__level" }, h(Pips, { level: r.level, levels: r.levels, stage: "review", label: "Level " + r.level + " of " + r.levels }), h("span", null, "Level " + r.level + "/" + r.levels + " · " + r.levelLabel)),
      h("dl", { className: "pw-dl" }, rows.map(function (x) { return [h("dt", { key: x[0] + "t" }, x[0]), h("dd", { key: x[0] + "d" }, x[1])]; }), r.credentialId ? [h("dt", { key: "idt" }, "Credential"), h("dd", { key: "idd", className: "pw-mono", style: { fontSize: 12 } }, r.credentialId)] : null),
      h("div", null, h("div", { className: "pw-label", style: { marginBottom: 8 } }, "Criteria · " + met + " of " + r.criteria.length + " met"),
        h("ul", { className: "pw-checks" }, r.criteria.map(function (c, i) {
          return h("li", { key: i, "data-stage": c.met ? "prove" : undefined, style: { color: c.met ? "var(--text-primary)" : "var(--text-secondary)" } },
            h("span", { style: { color: c.met ? "var(--stage-prove-text)" : "var(--text-tertiary)", display: "inline-flex", marginTop: 4 } }, c.met ? h(StageGlyph, { stage: "prove" }) : h(StageGlyph, { stage: "practice" })),
            h("span", { className: "pw-sr" }, c.met ? "Met: " : "Not met: "), c.label);
        }))),
      actions.length ? h("div", { className: "pw-sv__actions" }, actions) : null);
  }

  function dayKey(d) { return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(); }
  function dayHeading(d, now) {
    var t = new Date(now), y = new Date(now); y.setDate(y.getDate() - 1);
    if (dayKey(d) === dayKey(t)) return "Today";
    if (dayKey(d) === dayKey(y)) return "Yesterday";
    return new Intl.DateTimeFormat(undefined, { weekday: "long", day: "numeric", month: "short" }).format(d);
  }
  function ProgressTimeline(p) {
    var now = p.now || new Date(), compact = p.variant === "compact";
    var evs = p.events.slice().sort(function (a, b) { return new Date(b.at) - new Date(a.at); });
    var groups = [], map = {};
    evs.forEach(function (e) { var d = new Date(e.at), k = dayKey(d); if (!map[k]) { map[k] = { date: d, items: [] }; groups.push(map[k]); } map[k].items.push(e); });
    return h("div", { className: cx("pw-root", compact && "pw-tl--compact") },
      groups.map(function (g) {
        return h("section", { key: dayKey(g.date), "aria-label": dayHeading(g.date, now) },
          h("div", { className: "pw-label pw-tl__day" }, dayHeading(g.date, now)),
          h("ol", { className: cx("pw-tl", compact && "pw-tl--compact") }, g.items.map(function (e) {
            var title = p.onOpen && e.ref ? h("button", { type: "button", className: "pw-tl__title", onClick: function () { p.onOpen(e); } }, e.title) : h("p", { className: "pw-tl__title" }, e.title);
            return h("li", { key: e.id, className: "pw-tl__item" },
              h(ProofCell, { stage: e.stage, state: e.stage === "prove" ? "verified" : "done", size: 16 }),
              h("div", null, title, !compact && e.detail ? h("p", { className: "pw-tl__detail" }, e.detail) : null),
              h("time", { className: "pw-tl__time pw-num", dateTime: new Date(e.at).toISOString() }, new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(new Date(e.at))));
          })));
      }));
  }

  function LadderMark(p) {
    var s = p.size || 24, bw = s / 7, gap = bw / 2, out = [];
    for (var i = 0; i < 5; i++) {
      var ht = s * (0.28 + i * 0.18);
      out.push(h("rect", { key: i, x: i * (bw + gap * 0.6) , y: s - ht, width: bw, height: ht, rx: 1, style: { fill: i === 4 ? "var(--stage-prove-solid)" : "var(--brand)" } }));
    }
    return h("svg", { className: "pw-root", width: s, height: s, viewBox: "0 0 " + s + " " + s, role: "img", "aria-label": p.label || "Pathwisse" }, out);
  }

  window.Pathwisse = { STAGES: STAGES, StageGlyph: StageGlyph, summarizeCapability: summarizeCapability, Button: Button, Tag: Tag, Surface: Surface, Section: Section, Field: Field, Segmented: Segmented, Meter: Meter, Pips: Pips, Kbd: Kbd, ProofCell: ProofCell, CapabilityTrail: CapabilityTrail, ProjectEvidenceCard: ProjectEvidenceCard, SkillVerification: SkillVerification, ProgressTimeline: ProgressTimeline, LadderMark: LadderMark };
})();
