
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import axios from "axios";
import { defineString } from "firebase-functions/params";

admin.initializeApp();

const db = admin.firestore();
const cscartApiUrl = defineString("CSCART_API_URL");
const cscartApiToken = defineString("CSCART_API_TOKEN");


export const onVendorPendingCreate = onDocumentCreated("vendors_pending/{vendorId}", async (event) => {
    const snap = event.data;
    if (!snap) {
        console.log("No data associated with the event");
        return;
    }
    const vendorData = snap.data();
    const { businessName, email, phone, categories, socialHandles } = vendorData;

    const storeUrl = businessName.toLowerCase().replace(/\s+/g, "-");

    try {
      const response = await axios.post(
        cscartApiUrl.value(),
        {
          company: businessName,
          email,
          phone,
          categories: categories,
          social_handles: socialHandles,
          status: "A",
        },
        {
          headers: {
            Authorization: `Bearer ${cscartApiToken.value()}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { vendor_id: csCartId } = response.data;

      await db.collection("vendors_active").add({
        ...vendorData,
        csCartId,
        storeUrl,
      });

      await snap.ref.delete();

      console.log(`Vendor ${businessName} processed successfully.`);
    } catch (error) {
      console.error("Error processing vendor:", error);
    }
  });
