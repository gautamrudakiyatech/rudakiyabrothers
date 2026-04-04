export default function ShippingPage() {
  return (
    <main className="bg-[#fafafa] min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair text-4xl md:text-5xl text-rudakiya-dark mb-8 text-center">Shipping Policy</h1>
        <div className="w-16 h-[1px] bg-rudakiya-gold mx-auto mb-16"></div>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 font-inter text-gray-600 leading-relaxed space-y-8">
          <section>
            <h2 className="font-playfair text-2xl text-rudakiya-dark mb-4">1. Free & Insured Shipping</h2>
            <p>Rudakiya Brothers is proud to offer absolutely free, PAN-India shipping on all orders. Due to the high value of our products, every single package dispatched from our facility is 100% comprehensively insured until it is safely delivered and signed for by you.</p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl text-rudakiya-dark mb-4">2. Processing & Delivery Timelines</h2>
            <p>Because every piece is meticulously handcrafted by our master artisans to your specific ring size and metal preferences upon order, please allow up to <strong>20 working days</strong> for standard delivery. For complex bespoke orders, our consultants will provide a custom timeline during the design phase.</p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl text-rudakiya-dark mb-4">3. Order Tracking</h2>
            <p>The moment your order is dispatched, you will receive a confirmation email and SMS containing a secure tracking link. Our logistics partners are specialized in high-value goods transport to ensure secure and timely arrivals.</p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl text-rudakiya-dark mb-4">4. Delivery Authentication</h2>
            <p>To protect your purchase, our delivery partners adhere to strict KYC protocols. A valid, government-issued photo ID (such as an Aadhar Card, PAN Card, or Passport) must be presented by the receiver at the designated delivery address before the package is handed over.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
