export const defaultHistoryContent = `<article><p>The Life Global Outreach Ministries carries a story of God’s grace, a gospel burden, and people who have served faithfully through the years. Our history is a record of the ministry’s journey, the people God used, and the vision that continues to guide our work.</p><h2>A story still unfolding</h2><p>From worship and discipleship to outreach and conventions, every chapter reflects prayer, teaching, sacrifice, and service. The ministry’s heritage continues to shape the way we take the Word to the world.</p><h2>Milestones and memories</h2><p>The story of TLGOM includes faithful seasons, meaningful gatherings, and the lives touched through the ministry. As the journey continues, this page will preserve the milestones and memories that have helped shape our witness.</p><h2>Liberty Convention</h2><p>The Liberty Convention archive will preserve themes, years, images, and memories from this important part of the ministry’s journey as the record continues to grow.</p></article>`;

function escapeHtml(value: string) { return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;"); }

function scopeHistoryCss(css: string) {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, "");
  return source.replace(/([^{}]+)\{/g, (match, rawSelector: string) => {
    const selector = rawSelector.trim();
    if (!selector || selector.startsWith("@")) return match;
    const scoped = selector.split(",").map((item) => {
      const clean = item.trim().replace(/^:root\b/, "").replace(/^(html|body)\b/, "").trim();
      return clean.startsWith(".history-rich-content") ? clean : `.history-rich-content${clean ? ` ${clean}` : ""}`;
    }).join(", ");
    return match.replace(rawSelector, scoped);
  });
}

/** Converts plain text to paragraphs and scopes editor styles to the history content area. */
export function normalizeHistoryHtml(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const html = /<[a-z][\s\S]*>/i.test(trimmed) ? trimmed : trimmed.split(/\n\s*\n/).map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br />")}</p>`).join("");
  const styles: string[] = [];
  const withoutStyles = html.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, (_, css: string) => { styles.push(scopeHistoryCss(css)); return ""; });
  return styles.length ? `${withoutStyles}<style>${styles.join("\n")}</style>` : withoutStyles;
}
