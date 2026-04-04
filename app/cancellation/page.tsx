export default function CancellationPage() {
  return (
    <main className="bg-[#fafafa] min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair text-4xl md:text-5xl text-rudakiya-dark mb-8 text-center">Cancellation & Exchange</h1>
        <div className="w-16 h-[1px] bg-rudakiya-gold mx-auto mb-16"></div>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 font-inter text-gray-600 leading-relaxed space-y-8">
          <section>
            <h2 className="font-playfair text-2xl text-rudakiya-dark mb-4">1. 7-Day Easy Returns</h2>
            <p>At Rudakiya Brothers, your complete satisfaction is paramount. If you are not absolutely delighted with your purchase, we offer a hassle-free, 100% refund policy within 7 days of delivery. The jewelry must be unworn, undamaged, and returned in its original packaging along with all diamond grading certificates.</p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl text-rudakiya-dark mb-4">2. Lifetime Exchange Policy</h2>
            <p>We respect the lifelong value of your purchase. You may exchange your jewelry anytime in the future for a new piece. We will value your item at 100% of the current market gold rate and 100% of the original invoice value of the diamonds (minus making charges and GST).</p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl text-rudakiya-dark mb-4">3. Lifetime Buyback Policy</h2>
            <p>Should you wish to liquidate your jewelry, our lifetime buyback policy guarantees an exceptional return. We offer 90% of the current market gold value, and 70% of the original diamond value (minus making charges and GST). The buyback amount will be transferred to your registered bank account following a quality inspection by our gemologists.</p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl text-rudakiya-dark mb-4">4. Bespoke & Custom Orders</h2>
            <p>Due to the hyper-personalized nature of bespoke orders and customized engravings, these items do not qualify for the standard 7-Day Return policy. However, customized items are still eligible for our Lifetime Exchange and Buyback programs.</p>
          </section>
          
          <section>
            <h2 className="font-playfair text-2xl text-rudakiya-dark mb-4">5. Cancellation Before Shipment</h2>
            <p>If you need to change your mind, orders can be canceled prior to dispatch for a full refund. Please contact our support team immediately if you wish to cancel an order, as our crafting process begins swiftly.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
