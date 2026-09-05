import "server-only";

type FirestoreValue = { stringValue?: string; integerValue?: string; doubleValue?: number; booleanValue?: boolean; timestampValue?: string; nullValue?: null; arrayValue?: { values?: FirestoreValue[] }; mapValue?: { fields?: Record<string, FirestoreValue> } };
type FirestoreDocument = { name?: string; fields?: Record<string, FirestoreValue> };

function decode(value: FirestoreValue | undefined): unknown {
  if (!value) return null;
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.integerValue !== undefined) return Number(value.integerValue);
  if (value.doubleValue !== undefined) return value.doubleValue;
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.timestampValue !== undefined) return value.timestampValue;
  if (value.nullValue !== undefined) return null;
  if (value.arrayValue) return (value.arrayValue.values || []).map(decode);
  if (value.mapValue) return Object.fromEntries(Object.entries(value.mapValue.fields || {}).map(([key, item]) => [key, decode(item)]));
  return null;
}

function decodeDocument(document: FirestoreDocument) {
  const id = document.name?.split("/").pop() || "";
  return { id, ...Object.fromEntries(Object.entries(document.fields || {}).map(([key, value]) => [key, decode(value)])) };
}

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

export async function getPublicCollection(collectionName: string) {
  if (!projectId) return [] as Record<string, unknown>[];
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/${encodeURIComponent(collectionName)}${apiKey ? `?key=${encodeURIComponent(apiKey)}` : ""}`;
  try {
    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) return [] as Record<string, unknown>[];
    const payload = await response.json() as { documents?: FirestoreDocument[] };
    return (payload.documents || []).map(decodeDocument);
  } catch { return [] as Record<string, unknown>[]; }
}

export async function getPublicDocument(collectionName: string, documentId: string) {
  if (!projectId) return undefined;
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents/${encodeURIComponent(collectionName)}/${encodeURIComponent(documentId)}${apiKey ? `?key=${encodeURIComponent(apiKey)}` : ""}`;
  try {
    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) return undefined;
    return decodeDocument(await response.json() as FirestoreDocument);
  } catch { return undefined; }
}
