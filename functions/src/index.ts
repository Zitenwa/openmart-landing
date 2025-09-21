import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from "cors";

admin.initializeApp();
const db = admin.firestore();

const corsHandler = cors({ origin: true });

export const submitVendorForm = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    try {
      const { fullName, businessName, email, phone, socialLinks, categories } = req.body;

      if (!fullName || !email || !phone || !categories) {
        res.status(400).send("Missing required fields");
        return;
      }

      const newVendor = {
        fullName,
        businessName: businessName || "",
        email,
        phone,
        socialLinks: socialLinks || [],
        categories,
        submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const docRef = await db.collection("vendorForms").add(newVendor);

      res.status(200).json({ success: true, id: docRef.id });
    } catch (error) {
      console.error("Error submitting vendor form:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});
