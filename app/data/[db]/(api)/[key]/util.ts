export function isValidate(db: number | undefined) {
    if (typeof db == "undefined") return false;
    return Number(db) < 16 && Number(db) >= 0
}
