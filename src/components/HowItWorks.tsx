

export default function HowItWorks() {
    return (
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
    )
}
