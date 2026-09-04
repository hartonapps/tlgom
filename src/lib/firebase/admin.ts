import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
const adminReady = Boolean(process.env.FIREBASE_ADMIN_PROJECT_ID && process.env.FIREBASE_ADMIN_CLIENT_EMAIL && privateKey);

const adminApp = adminReady
  ? (getApps().length ? getApps()[0] : initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey,
      }),
    }))
  : null;

export async function verifyAdminToken(token: string) {
  if (!adminApp) throw new Error("Firebase Admin is not configured.");
  return getAuth(adminApp).verifyIdToken(token);
}

export function getAdminDb() {
  if (!adminApp) throw new Error("Firebase Admin is not configured.");
  return getFirestore(adminApp);
}
