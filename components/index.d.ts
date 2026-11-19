type StageId = "learn" | "practice" | "build" | "review" | "prove";
type CellState = "locked" | "available" | "active" | "done" | "verified";
export interface ButtonProps { variant?: "primary" | "secondary" | "ghost" | "stage" | "danger"; size?: "sm" | "md" | "lg"; stage?: StageId; block?: boolean; iconOnly?: boolean; loading?: boolean; onClick?: () => void; children?: any }
export interface TagProps { tone?: "neutral" | "success" | "warning" | "danger" | "quiet"; stage?: StageId; children?: any }
export interface SurfaceProps { variant?: "default" | "flat" | "inset" | "raised"; padding?: "none" | "sm" | "md" | "lg"; notch?: boolean; as?: string; children?: any }
export interface SectionProps { index?: string; eyebrow?: string; title: any; actions?: any; children?: any }
export interface FieldProps { label: string; hint?: string; error?: string; multiline?: boolean; [inputAttr: string]: any }
export interface SegmentedProps { options: { value: string; label: string }[]; value: string; onChange?: (v: string) => void; label?: string; role?: "radiogroup" | "tablist" }
export interface MeterProps { value: number; max?: number; stage?: StageId; label: string; showValue?: boolean }
export interface PipsProps { level: number; levels?: number; stage?: StageId; label?: string }
export interface KbdProps { children?: any }
export interface ProofCellProps { stage: StageId; state?: CellState; progress?: number; size?: 16 | 24 | 32; onClick?: () => void; selected?: boolean; label?: string }
export interface StageProgress { stage: StageId; state: CellState; progress?: number; detail?: string }
export interface Capability { id: string; title: string; summary?: string; stages: StageProgress[]; nextLessonId?: string }
export interface CapabilityTrailProps { capabilities: Capability[]; variant?: "ledger" | "compact" | "focus"; selectedId?: string; onSelect?: (c: Capability) => void }
export interface ProjectEvidence { id: string; reference: string; title: string; summary: string; stage: StageId; skills: { id: string; label: string }[]; artifacts: { kind: string; label: string; href?: string }[]; review?: { outcome: string; reviewer?: string; notes?: number } | null; verifiedAt?: string | null; createdAt: string }
export interface ProjectEvidenceCardProps { evidence: ProjectEvidence; variant?: "default" | "compact" | "featured"; onOpen?: (e: ProjectEvidence) => void }
export interface SkillVerificationRecord { id: string; skillId: string; skillLabel: string; level: number; levels: number; levelLabel: string; method: string; issuer: string; credentialId?: string | null; issuedAt?: string | null; expiresAt?: string | null; status: "verified" | "pending" | "expired"; criteria: { label: string; met: boolean }[]; evidenceCount: number; shareUrl?: string | null }
export interface SkillVerificationProps { record: SkillVerificationRecord; variant?: "card" | "row"; onCopy?: (r: SkillVerificationRecord) => void; onRequest?: (r: SkillVerificationRecord) => void }
export interface TimelineEvent { id: string; stage: StageId; title: string; detail?: string; at: string; ref?: string }
export interface ProgressTimelineProps { events: TimelineEvent[]; variant?: "default" | "compact"; onOpen?: (e: TimelineEvent) => void; now?: Date }
export interface LadderMarkProps { size?: number; label?: string }
