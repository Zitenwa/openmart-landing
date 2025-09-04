import { useState } from "react";
import { Instagram, Facebook, MessageCircle, ShoppingBag } from "lucide-react";

export default function App() {
  const [submitted, setSubmitted] = useState(false);

  const categories = ["Fashion", "Electronics", "Beauty", "Home & Living", "Health"];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-6">
      {/* Title Bar */}
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">OpenMart</h1>
          <a
            href="#signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-colors duration-300"
          >
            Become a Vendor
          </a>
        </div>
      </nav>

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

        {/* How It Works */}
        <section className="max-w-4xl text-center mb-16 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid md:grid-cols-5 gap-6 text-sm text-gray-700">
            {[
              "1. Onboard Easily",
              "2. Choose Your Categories",
              "3. Auto-Synced Storefront",
              "4. Social Handle Integration",
              "5. Earn With Ease",
            ].map((step) => (
              <div key={step} className="p-4 bg-white shadow rounded-xl">
                {step}
              </div>
            ))}
          </div>
        </section>

        {/* USP Section */}
        <section className="max-w-4xl text-center mb-16 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Why OpenMart</h2>
          <ul className="grid md:grid-cols-2 gap-6 text-left text-gray-700">
            {[
              "No Inventory Stress – dropshipping model.",
              "Social-Powered Sales – leverage your existing network.",
              "AI Product Assignment – sell only what you prefer.",
              "Automated Fulfilment – logistics handled for you.",
              "Extra Income, Zero Hassle – perfect for busy professionals.",
            ].map((usp) => (
              <li key={usp} className="bg-white shadow p-4 rounded-xl">
                {usp}
              </li>
            ))}
          </ul>
        </section>

        {/* Signup Form */}
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
              name="vendor-signup"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="space-y-6"
              role="form"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <input type="hidden" name="form-name" value="vendor-signup" />
              <p className="hidden">
                <label>
                  Don’t fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              {/* Inputs */}
              <input
                type="text"
                name="name"
                placeholder="Full Name / Business Name"
                required
                className="w-full border p-3 rounded-xl"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full border p-3 rounded-xl"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full border p-3 rounded-xl"
              />

              {/* Social Handles */}
              <div className="space-y-4">
                <p className="font-medium">Link Your Social Handles:</p>
                <div className="flex items-center border rounded-xl px-3">
                  <MessageCircle className="w-5 h-5 text-green-500 mr-2" />
                  <input
                    type="url"
                    name="whatsapp"
                    placeholder="WhatsApp link"
                    className="w-full p-3 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="flex items-center border rounded-xl px-3">
                  <Instagram className="w-5 h-5 text-pink-500 mr-2" />
                  <input
                    type="url"
                    name="instagram"
                    placeholder="Instagram profile link"
                    className="w-full p-3 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="flex items-center border rounded-xl px-3">
                  <Facebook className="w-5 h-5 text-blue-600 mr-2" />
                  <input
                    type="url"
                    name="facebook"
                    placeholder="Facebook page link"
                    className="w-full p-3 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="flex items-center border rounded-xl px-3">
                  <ShoppingBag className="w-5 h-5 text-black mr-2" />
                  <input
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
                      className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-xl cursor-pointer hover:bg-blue-100"
                    >
                      <input
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
                <label className="inline-flex items-center">
                  <input type="checkbox" name="consent" required className="mr-2" />
                  I agree to OpenMart’s Vendor Terms of Service.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl transition-colors duration-300"
              >
                Submit Application
              </button>
            </form>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm mb-6">
        Powered by Nexxintel • © {new Date().getFullYear()} OpenMart
      </footer>
    </div>
  );
}
