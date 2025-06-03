import admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";
import serviceAccountJson from "./firebase-service-account.json";
import { ServiceAccount } from "firebase-admin";

const serviceAccount = serviceAccountJson as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET,
});

console.log("Using bucket:", getStorage().bucket().name);

export const bucket = getStorage().bucket();
