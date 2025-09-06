
interface TermsOfServiceProps {
    effectiveDate: string;
    governingLaw: string;
}

export default function TermsOfService({ effectiveDate, governingLaw }: TermsOfServiceProps) {
    return (
        <div className="prose max-w-none">
            <h2>OpenMart Vendor Terms of Service</h2>
            <p><strong>Effective Date:</strong> {effectiveDate}</p>
            <p><strong>Platform:</strong> OpenMart, a marketplace within the Nexxintel Hub</p>
            <p>These Terms of Service (“Terms”) govern your participation as a Vendor on OpenMart. By registering, you agree to these Terms and any future updates.</p>
            <h3>1. Eligibility & Registration</h3>
            <ul>
                <li>Vendors must be registered practitioners or businesses within Nexxintel Hub.</li>
                <li>Vendors must provide valid social media handles (e.g., WhatsApp Business, Instagram, Facebook Shops, TikTok Shop) for synchronization.</li>
            </ul>
            <h3>2. Store Creation & Product Category Selection</h3>
            <p>Upon registration, Vendors:</p>
            <ul>
                <li>Select preferred product categories,</li>
                <li>Are automatically assigned a storefront under their business name,</li>
                <li>Have products from selected categories displayed in their store.</li>
            </ul>
            <p>Vendors’ stores are synchronized with their submitted social handles.</p>
            <h3>3. Multi-Channel Synchronization</h3>
            <ul>
                <li>Products may be automatically pushed to Vendors’ social channels.</li>
                <li>Vendors agree to comply with third-party platform policies (e.g., Meta Commerce, TikTok Shop).</li>
                <li>OpenMart is not responsible for platform suspensions or restrictions resulting from Vendor activity.</li>
            </ul>
            <h3>4. Earnings & Commissions</h3>
            <ul>
                <li>Vendors earn a commission on sales attributed to their storefront and connected social channels.</li>
                <li>Commission rates and payout schedules are displayed on the Vendor dashboard.</li>
                <li>Payments are disbursed in accordance with OpenMart’s payout cycle.</li>
            </ul>
            <h3>5. Vendor Conduct & Responsibilities</h3>
            <p>Vendors must:</p>
            <ul>
                <li>Engage professionally with customers,</li>
                <li>Avoid misrepresentation or false advertising,</li>
                <li>Respect buyer privacy and data.</li>
            </ul>
            <p>Vendors do not manage product logistics but may be rated on responsiveness and professionalism.</p>
            <h3>6. Prohibited Conduct</h3>
            <p>Vendors must not:</p>
            <ul>
                <li>Manipulate sales or reviews,</li>
                <li>Misuse customer data,</li>
                <li>List or promote products outside of assigned categories without approval.</li>
            </ul>
            <h3>7. Data & Privacy</h3>
            <ul>
                <li>Vendors authorize OpenMart to process and display their store, product, and sales data for marketplace operations.</li>
                <li>Customer data may only be used to facilitate sales and may not be misused.</li>
            </ul>
            <h3>8. Liability & Disclaimers</h3>
            <ul>
                <li>Vendors act as resellers/agents, not product owners.</li>
                <li>Merchants remain responsible for product quality, warranties, and delivery.</li>
                <li>OpenMart is not liable for customer disputes arising from vendor misrepresentation.</li>
            </ul>
            <h3>9. Suspension & Termination</h3>
            <p>OpenMart may suspend or terminate Vendor accounts for:</p>
            <ul>
                <li>Breach of these Terms,</li>
                <li>Repeated customer complaints,</li>
                <li>Misuse of the platform or data.</li>
            </ul>
            <p>Vendors may request termination, subject to resolution of outstanding commissions.</p>
            <h3>10. Governing Law</h3>
            <p>These Terms are governed by the laws of {governingLaw}. Disputes shall be resolved through [Insert Mechanism].</p>
            <h3>Vendor Acceptance</h3>
            <p>By registering as a Vendor on OpenMart, you confirm that you have read, understood, and a ccepted these Terms.</p>
        </div>
    );
}
