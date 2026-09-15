export type ContactSocialLinks = { facebook?: string; instagram?: string; youtube?: string; x?: string; whatsapp?: string };
export type ContactSettings = { emails: string[]; phones: string[]; serviceTimes: string[]; socialLinks: ContactSocialLinks };
export const defaultContactSettings: ContactSettings = { emails: [], phones: [], serviceTimes: [], socialLinks: {} };
