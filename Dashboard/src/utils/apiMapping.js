/**
 * SALEM — API value normalization & display labels
 * Backend may return English enums (e.g. IN_PROGRESS) or human strings.
 * UI stays the same; only the displayed text / internal keys are consistent.
 */

/** @param {unknown} v */
function rawString(v) {
    if (v == null) return "";
    if (typeof v === "object") return String(v.name ?? v.label ?? v.status ?? v.id ?? "");
    return String(v);
}

/**
 * Normalize to a token like "IN_PROGRESS" for lookup tables.
 * @param {unknown} input
 */
export function normalizeStatusToken(input) {
    return rawString(input)
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "_")
        .replace(/-/g, "_");
}

/* -------------------------------------------------------------------------- */
/* Reports / Home / tables (keys align with existing i18n + statusStyles)      */
/* -------------------------------------------------------------------------- */

const REPORTS_STATUS_FROM_TOKEN = {
    NEW: "inProgress",
    OPEN: "inProgress",
    PENDING: "inProgress",
    ASSIGNED: "inProgress",
    IN_PROGRESS: "inProgress",
    INPROGRESS: "inProgress",
    REVIEW: "underReview",
    UNDER_REVIEW: "underReview",
    REJECTED: "rejected",
    COMPLETED: "solved",
    RESOLVED: "solved",
    CLOSED: "solved",
    SOLVED: "solved",
    DONE: "solved",
};

/**
 * Status key for reports + home recent table: inProgress | underReview | solved | rejected
 * @param {unknown} input
 */
export function toReportsStatusKey(input) {
    const t = normalizeStatusToken(input);
    if (REPORTS_STATUS_FROM_TOKEN[t]) return REPORTS_STATUS_FROM_TOKEN[t];
    const lower = rawString(input).toLowerCase();
    if (lower.includes("reject")) return "rejected";
    if (lower.includes("review")) return "underReview";
    if (lower.includes("complete") || lower.includes("resolved") || lower.includes("closed") || lower.includes("solved"))
        return "solved";
    if (lower.includes("progress") || lower.includes("assign") || lower.includes("new") || lower.includes("open") || lower.includes("pending"))
        return "inProgress";
    return "inProgress";
}

/* -------------------------------------------------------------------------- */
/* Workflow kanban columns: new | assigned | inProgress | review | done        */
/* -------------------------------------------------------------------------- */

const WORKFLOW_STATUS_FROM_TOKEN = {
    NEW: "new",
    OPEN: "new",
    PENDING: "new",
    ASSIGNED: "assigned",
    IN_PROGRESS: "inProgress",
    INPROGRESS: "inProgress",
    REVIEW: "review",
    UNDER_REVIEW: "review",
    COMPLETED: "done",
    RESOLVED: "done",
    CLOSED: "done",
    SOLVED: "done",
    DONE: "done",
    REJECTED: "review",
};

/**
 * @param {unknown} input
 */
export function toWorkflowStatusKey(input) {
    const t = normalizeStatusToken(input);
    if (WORKFLOW_STATUS_FROM_TOKEN[t]) return WORKFLOW_STATUS_FROM_TOKEN[t];
    const lower = rawString(input).toLowerCase();
    if (lower.includes("assign")) return "assigned";
    if (lower.includes("review") || lower.includes("reject")) return "review";
    if (lower.includes("complete") || lower.includes("resolved") || lower.includes("closed") || lower.includes("solved") || lower.includes("done"))
        return "done";
    if (lower.includes("progress")) return "inProgress";
    if (lower.includes("new") || lower.includes("open") || lower.includes("pending")) return "new";
    return "new";
}

/* -------------------------------------------------------------------------- */
/* Priority: low | medium | high (for CSS class maps)                           */
/* -------------------------------------------------------------------------- */

const PRIORITY_FROM_TOKEN = {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
};

/**
 * @param {unknown} input
 */
export function normalizePriorityKey(input) {
    const t = rawString(input).trim().toUpperCase().replace(/\s+/g, "_");
    if (PRIORITY_FROM_TOKEN[t]) return PRIORITY_FROM_TOKEN[t];
    const lower = rawString(input).toLowerCase();
    if (lower.includes("high")) return "high";
    if (lower.includes("low")) return "low";
    if (lower.includes("medium") || lower.includes("mid")) return "medium";
    return "medium";
}

/* -------------------------------------------------------------------------- */
/* Display labels (Arabic per product spec; English mirror for EN UI)         */
/* -------------------------------------------------------------------------- */

const STATUS_LABEL_AR_BY_WORKFLOW_KEY = {
    new: "بلاغ جديد",
    assigned: "تم التعيين",
    inProgress: "قيد التنفيذ",
    review: "قيد المراجعة",
    done: "تم الانتهاء",
};

const STATUS_LABEL_EN_BY_WORKFLOW_KEY = {
    new: "New",
    assigned: "Assigned",
    inProgress: "In progress",
    review: "Under review",
    done: "Completed",
};

const STATUS_LABEL_AR_BY_REPORTS_KEY = {
    inProgress: "قيد التنفيذ",
    underReview: "قيد المراجعة",
    solved: "تم الانتهاء",
    rejected: "مرفوض",
};

const STATUS_LABEL_EN_BY_REPORTS_KEY = {
    inProgress: "In progress",
    underReview: "Under review",
    solved: "Completed",
    rejected: "Rejected",
};

const PRIORITY_LABEL_AR = {
    low: "منخفضة",
    medium: "متوسطة",
    high: "عالية",
};

const PRIORITY_LABEL_EN = {
    low: "Low",
    medium: "Medium",
    high: "High",
};

/**
 * Human-readable status for workflow board.
 * @param {string} lang i18n language code (e.g. "ar" | "en")
 * @param {unknown} rawOrKey API value or already-normalized workflow key
 */
export function workflowStatusLabel(lang, rawOrKey) {
    const key = ["new", "assigned", "inProgress", "review", "done"].includes(String(rawOrKey))
        ? String(rawOrKey)
        : toWorkflowStatusKey(rawOrKey);
    if (lang === "ar") return STATUS_LABEL_AR_BY_WORKFLOW_KEY[key] ?? rawString(rawOrKey);
    return STATUS_LABEL_EN_BY_WORKFLOW_KEY[key] ?? rawString(rawOrKey);
}

/**
 * Human-readable status for reports / home tables.
 * @param {string} lang
 * @param {unknown} rawOrKey
 */
export function reportsStatusLabel(lang, rawOrKey) {
    const key = ["inProgress", "underReview", "solved", "rejected"].includes(String(rawOrKey))
        ? String(rawOrKey)
        : toReportsStatusKey(rawOrKey);
    if (lang === "ar") return STATUS_LABEL_AR_BY_REPORTS_KEY[key] ?? rawString(rawOrKey);
    return STATUS_LABEL_EN_BY_REPORTS_KEY[key] ?? rawString(rawOrKey);
}

/**
 * @param {string} lang
 * @param {unknown} rawOrKey
 */
export function priorityLabel(lang, rawOrKey) {
    const key = normalizePriorityKey(rawOrKey);
    if (lang === "ar") return PRIORITY_LABEL_AR[key] ?? rawString(rawOrKey);
    return PRIORITY_LABEL_EN[key] ?? rawString(rawOrKey);
}
