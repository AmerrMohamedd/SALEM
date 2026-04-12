/**
 * Extract a user-facing message from an Axios / API error (DRF shapes).
 * @param {unknown} err
 * @param {string} [fallback]
 */
export function getApiErrorMessage(err, fallback = "Request failed") {
    const data = err?.response?.data;
    if (!data) return err?.message || fallback;
    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail)) return data.detail.map(String).join(", ");
    if (typeof data.message === "string") return data.message;
    const first = Object.values(data)[0];
    if (Array.isArray(first) && first.length) return String(first[0]);
    if (typeof first === "string") return first;
    try {
        return JSON.stringify(data);
    } catch {
        return fallback;
    }
}
