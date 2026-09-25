import type { FieldHook } from "payload";

/** Unique text fields cannot store "". Convert blank editor values to null. */
export const emptyToNull: FieldHook = ({ value }) => {
  if (typeof value !== "string") return value ?? null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
};
