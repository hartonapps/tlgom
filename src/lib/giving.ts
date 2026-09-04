export type GivingAccount = { id: string; imageUrl: string; bankName: string; accountName: string; accountNumber: string; currency: string; note: string; visible?: boolean };
export type GivingSettings = { accounts: GivingAccount[] };
export const defaultGivingSettings: GivingSettings = { accounts: [] };
export const givingCurrencies = ["NGN", "USD", "GBP", "EUR", "CAD", "AUD", "ZAR", "GHS", "KES"];

export function normalizeGivingAccounts(data: Record<string, unknown> | undefined): GivingAccount[] {
  if (Array.isArray(data?.accounts)) return data.accounts as GivingAccount[];
  if (typeof data?.accountNumber === "string" && data.accountNumber.trim()) {
    return [{ id: "legacy-giving-account", imageUrl: typeof data.imageUrl === "string" ? data.imageUrl : "", bankName: typeof data.bankName === "string" ? data.bankName : "", accountName: typeof data.accountName === "string" ? data.accountName : "", accountNumber: data.accountNumber, currency: typeof data.currency === "string" ? data.currency : "NGN", note: typeof data.note === "string" ? data.note : "", visible: data.visible !== false }];
  }
  return [];
}
