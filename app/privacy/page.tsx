export default function PrivacyPage() {
  return (
    <main className="bg-[#fafafa] min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair text-4xl md:text-5xl text-rudakiya-dark mb-8 text-center">Privacy Policy</h1>
        <div className="w-16 h-[1px] bg-rudakiya-gold mx-auto mb-16"></div>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 font-inter text-gray-600 leading-relaxed space-y-8">
          <section>
            <h2 className="font-playfair text-2xl text-rudakiya-dark mb-4">Protecting Your Privacy</h2>
            <p>At Rudakiya Brothers, we value your trust and respect your privacy. This Privacy Policy, compliant with the Information Technology Act (India), explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.</p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl text-rudakiya-dark mb-4">Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Personal Data:</strong> Name, email address, phone number, shipping and billing address provided during checkout.</li>
              <li><strong>Transaction Data:</strong> Payment details (processed securely via encrypted third-party payment gateways; we do not store your credit card data).</li>
              <li><strong>Usage Data:</strong> IP addresses, browser types, and interaction data collected through cookies.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-playfair text-2xl text-rudakiya-dark mb-4">How We Use Your Data</h2>
            <p>Your data is used strictly to fulfill your orders, provide dedicated customer support, process lifetime exchange/buyback requests, and, with your explicit consent, send you updates about our exclusive jewelry collections and promotions.</p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl text-rudakiya-dark mb-4">Cookies and Tracking</h2>
            <p>Our website utilizes cookies to enhance your browsing experience, remember your cart preferences, and analyze site traffic patterns. You can choose to disable cookies through your browser settings, though this may impact certain site functionalities.</p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl text-rudakiya-dark mb-4">Your Rights</h2>
            <p>You have the right to request access to, modification of, or deletion of your personal data stored with us at any time. Simply contact our support team at <a href="mailto:support@rudakiyabrothers.com" className="text-rudakiya-gold hover:underline">support@rudakiyabrothers.com</a>.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
