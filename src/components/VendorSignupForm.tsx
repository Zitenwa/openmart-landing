
import { useState } from "react";
import { Instagram, Facebook, MessageCircle, ShoppingBag } from "lucide-react";
import Modal from "./Modal";
import TermsOfService from "./TermsOfService";

export default function VendorSignupForm() {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

    const categories = ["Fashion", "Electronics", "Beauty", "Home & Living", "Health"];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const socialLinks = [
            formData.get('whatsapp'),
            formData.get('instagram'),
            formData.get('facebook'),
            formData.get('tiktok')
        ].filter(link => !!link);

        const data = {
            fullName: formData.get('fullName'),
            businessName: formData.get('businessName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            socialLinks,
            categories: formData.getAll('categories'),
        };

        if (!data.fullName || !data.email || !data.phone || data.categories.length === 0) {
            setError("Please fill out all required fields.");
            setIsLoading(false);
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            if (!apiUrl) {
                setError("API URL is not configured. Please contact support.");
                setIsLoading(false);
                return;
            }
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const result = await response.json();
                setError(result.error || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setError('There was an error submitting your application. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section
            id="signup"
            className="max-w-xl w-full bg-white p-8 shadow-xl rounded-2xl mb-16 mx-auto"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Vendor Signup</h2>
            {submitted ? (
                <p className="text-green-600 font-semibold text-center">
                    ✅ Thank you! Your application has been received.
                </p>
            ) : (
                <form
                    className="space-y-6"
                    role="form"
                    onSubmit={handleSubmit}
                >
                    {error && (
                        <p className="text-red-500 text-sm text-center bg-red-100 p-3 rounded-xl">
                            {error}
                        </p>
                    )}
                    {/* Inputs */}
                    <div>
                        <label htmlFor="fullName" className="sr-only">Full Name</label>
                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            required
                            className="w-full border p-3 rounded-xl"
                        />
                    </div>
                    <div>
                        <label htmlFor="businessName" className="sr-only">Business Name</label>
                        <input
                            id="businessName"
                            type="text"
                            name="businessName"
                            placeholder="Business Name (Optional)"
                            className="w-full border p-3 rounded-xl"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            className="w-full border p-3 rounded-xl"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="sr-only">Phone Number</label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            required
                            className="w-full border p-3 rounded-xl"
                        />
                    </div>

                    {/* Social Handles */}
                    <div className="space-y-4">
                        <p className="font-medium">Link Your Social Handles:</p>
                        <div className="flex items-center border rounded-xl px-3">
                             <MessageCircle className="w-5 h-5 text-green-500 mr-2" />
                             <label htmlFor="whatsapp" className="sr-only">WhatsApp link</label>
                            <input
                                id="whatsapp"
                                type="url"
                                name="whatsapp"
                                placeholder="WhatsApp link"
                                className="w-full p-3 rounded-xl focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border rounded-xl px-3">
                            <Instagram className="w-5 h-5 text-pink-500 mr-2" />
                            <label htmlFor="instagram" className="sr-only">Instagram profile link</label>
                            <input
                                id="instagram"
                                type="url"
                                name="instagram"
                                placeholder="Instagram profile link"
                                className="w-full p-3 rounded-xl focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border rounded-xl px-3">
                            <Facebook className="w-5 h-5 text-blue-600 mr-2" />
                            <label htmlFor="facebook" className="sr-only">Facebook page link</label>
                            <input
                                id="facebook"
                                type="url"
                                name="facebook"
                                placeholder="Facebook page link"
                                className="w-full p-3 rounded-xl focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center border rounded-xl px-3">
                            <ShoppingBag className="w-5 h-5 text-black mr-2" />
                            <label htmlFor="tiktok" className="sr-only">TikTok profile link</label>
                            <input
                                id="tiktok"
                                type="url"
                                name="tiktok"
                                placeholder="TikTok profile link"
                                className="w-full p-3 rounded-xl focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="space-y-2">
                        <p className="font-medium">Preferred Product Categories:</p>
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <label
                                    key={category}
                                    htmlFor={`category-${category}`}
                                    className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-xl cursor-pointer hover:bg-blue-100"
                                >
                                    <input
                                        id={`category-${category}`}
                                        type="checkbox"
                                        name="categories"
                                        value={category}
                                        className="form-checkbox text-blue-600"
                                    />
                                    <span>{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Consent */}
                    <div>
                        <label htmlFor="consent" className="inline-flex items-center">
                            <input id="consent" type="checkbox" name="consent" required className="mr-2" />
                            <span>I agree to <button type="button" onClick={() => setIsTermsModalOpen(true)} className="text-blue-600 hover:underline">OpenMart’s Vendor Terms of Service</button>.</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl transition-colors duration-300 disabled:bg-blue-400"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            )}
            <Modal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} title="OpenMart Vendor Terms of Service">
                <TermsOfService effectiveDate="January 2025" governingLaw="[Insert Jurisdiction]" />
            </Modal>
        </section>
    )
}
