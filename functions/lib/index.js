"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitVendorForm = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const firestore_1 = require("firebase-admin/firestore");
const cors_1 = __importDefault(require("cors"));
const corsHandler = (0, cors_1.default)({ origin: true });
admin.initializeApp();
const db = admin.firestore();
exports.submitVendorForm = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        if (req.method !== "POST") {
            functions.logger.warn(`Received ${req.method} request, only POST is allowed.`);
            res.status(405).send("Method Not Allowed");
            return;
        }
        functions.logger.info("Received POST request with body:", req.body);
        const { fullName, businessName, email, phone, categories, socialLinks } = req.body;
        if (!fullName || !email || !phone || !categories || !Array.isArray(categories) || categories.length === 0) {
            functions.logger.error("Validation failed. Missing or invalid required fields.", {
                fullName: !!fullName,
                email: !!email,
                phone: !!phone,
                categories: categories
            });
            res.status(400).json({ error: "Missing or invalid required fields." });
            return;
        }
        const dataToWrite = {
            fullName,
            businessName: businessName || null,
            email,
            phone,
            categories,
            socialLinks: socialLinks || [],
            timestamp: firestore_1.FieldValue.serverTimestamp(),
        };
        functions.logger.info("Attempting to write the following data to Firestore:", dataToWrite);
        try {
            const writeResult = await db.collection("vendors").add(dataToWrite);
            functions.logger.info(`Successfully wrote to Firestore with doc ID: ${writeResult.id}`);
            res.status(200).json({ success: true, message: "Vendor application submitted successfully." });
        }
        catch (error) {
            functions.logger.error("Error writing to Firestore:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
});
//# sourceMappingURL=index.js.map