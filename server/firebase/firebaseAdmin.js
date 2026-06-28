const admin = require("firebase-admin");

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined,
};

if (
  !serviceAccount.projectId ||
  !serviceAccount.clientEmail ||
  !serviceAccount.privateKey
) {
  console.warn("⚠️ Firebase not configured - skipping init");
  module.exports = null;
  return;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;