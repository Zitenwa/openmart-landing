
import React, { useState } from 'react';
import { Instagram, Facebook, MessageCircle, ShoppingBag } from "lucide-react";

const Home: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(event.currentTarget);
    const data = {
      fullName: formData.get('fullName') as string,
      businessName: formData.get('businessName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      socialLinks: {
        whatsapp: formData.get('whatsapp') as string,
        instagram: formData.get('instagram') as string,
        facebook: formData.get('facebook') as string,
        tiktok: formData.get('tiktok') as string,
      },
      categories: formData.getAll('categories') as string[],
    };

    try {
      const response = await fetch('https://us-central1-open-mart-5538f.cloudfunctions.net/submitVendorForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({ success: true, message: 'Application submitted successfully! We will be in touch.' });
        (event.target as HTMLFormElement).reset();
      } else {
        throw new Error('Submission failed. Please try again.');
      }
    } catch (error: any) {
      setSubmitStatus({ success: false, message: error.message || 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mt-28 w-full">
      {/* Hero Section */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Open Your Network. <br className="hidden md:inline" /> Earn Without Inventory.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          OpenMart is Africa’s smart dropshipping marketplace. Transform your social handles into a
          sales channel. Choose products you love, share them with your network, and earn extra income —
          no stock, no stress.
        </p>
        <a
          href="#signup"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg transition-colors duration-300"
        >
          Become a Vendor
        </a>
      </header>

      {/* Signup Form */}
      <section
        id="signup"
        className="max-w-xl w-full bg-white p-8 shadow-xl rounded-2xl mb-16 mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Vendor Signup</h2>
        <form
          name="vendor-signup"
          className="space-y-6"
          role="form"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input required type="text" name="fullName" placeholder="Full Name" className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="text" name="businessName" placeholder="Business Name (Optional)" className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input required type="email" name="email" placeholder="Email Address" className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input required type="tel" name="phone" placeholder="Phone Number" className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="space-y-4">
            <p className="font-medium">Link Your Social Handles (Optional):</p>
            <div className="flex items-center border rounded-xl px-3">
              <MessageCircle className="w-5 h-5 text-green-500 mr-2" />
              <input type="url" name="whatsapp" placeholder="WhatsApp link" className="w-full p-3 rounded-xl focus:outline-none" />
            </div>
            <div className="flex items-center border rounded-xl px-3">
              <Instagram className="w-5 h-5 text-pink-500 mr-2" />
              <input type="url" name="instagram" placeholder="Instagram profile link" className="w-full p-3 rounded-xl focus:outline-none" />
            </div>
            <div className="flex items-center border rounded-xl px-3">
              <Facebook className="w-5 h-5 text-blue-600 mr-2" />
              <input type="url" name="facebook" placeholder="Facebook page link" className="w-full p-3 rounded-xl focus:outline-none" />
            </div>
            <div className="flex items-center border rounded-xl px-3">
              <ShoppingBag className="w-5 h-5 text-black mr-2" />
              <input type="url" name="tiktok" placeholder="TikTok profile link" className="w-full p-3 rounded-xl focus:outline-none" />
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Select Product Categories (Choose at least one):</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              {['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty & Personal Care', 'Books', 'Toys & Games'].map(category => (
                <label key={category} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border">
                  <input type="checkbox" name="categories" value={category} className="rounded text-blue-600 focus:ring-blue-500" />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl transition-colors duration-300 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
          {submitStatus && (
            <p className={`text-center font-medium ${submitStatus.success ? 'text-green-600' : 'text-red-600'}`}>
              {submitStatus.message}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

export default Home;
