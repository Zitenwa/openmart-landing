import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import USPSection from "./components/USPSection";
import VendorSignupForm from "./components/VendorSignupForm";

export default function App() {
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
        <HeroSection />
        <HowItWorks />
        <USPSection />
        <VendorSignupForm />
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm mb-6">
        Powered by Nexxintel • © {new Date().getFullYear()} OpenMart
      </footer>
    </div>
  );
}
