
export default function USPSection() {
    return (
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
    )
}
