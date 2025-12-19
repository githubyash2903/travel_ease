import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen justify-center items-center text-center flex flex-col">
    
      
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: March 2024</p>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-3">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Personal identification information (name, email, phone number)</li>
                  <li>Payment information (credit card details, billing address)</li>
                  <li>Travel preferences and booking history</li>
                  <li>Passport and visa information when required</li>
                  <li>Communications with our customer support</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-3">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Processing and managing your bookings</li>
                  <li>Sending booking confirmations and updates</li>
                  <li>Providing customer support and responding to inquiries</li>
                  <li>Personalizing your experience and recommendations</li>
                  <li>Sending promotional offers and newsletters (with your consent)</li>
                  <li>Improving our services and website functionality</li>
                  <li>Complying with legal obligations and preventing fraud</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">3. Information Sharing</h2>
                <p className="text-muted-foreground mb-3">
                  We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Airlines, hotels, and other service providers to complete your bookings</li>
                  <li>Payment processors to handle transactions securely</li>
                  <li>Marketing partners (only with your explicit consent)</li>
                  <li>Law enforcement or regulatory authorities when legally required</li>
                  <li>Business partners in case of merger or acquisition</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  We never sell your personal information to third parties.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures to protect your personal information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-3">
                  <li>SSL/TLS encryption for all data transmissions</li>
                  <li>Secure payment processing through PCI-DSS compliant gateways</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection and privacy</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">5. Cookies and Tracking</h2>
                <p className="text-muted-foreground mb-3">
                  We use cookies and similar tracking technologies to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and user behavior</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Measure the effectiveness of our marketing campaigns</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
                <p className="text-muted-foreground mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to processing of your data</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  To exercise these rights, please contact our privacy team at privacy@travelease.com.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">7. Data Retention</h2>
                <p className="text-muted-foreground">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
                  policy, unless a longer retention period is required by law. Booking records are typically retained for 
                  7 years for accounting and legal purposes.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">8. International Data Transfers</h2>
                <p className="text-muted-foreground">
                  Your information may be transferred to and processed in countries other than your country of residence. 
                  We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy 
                  and applicable laws.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">9. Children's Privacy</h2>
                <p className="text-muted-foreground">
                  Our services are not directed to children under 13 years of age. We do not knowingly collect personal 
                  information from children. If you believe we have collected information from a child, please contact us 
                  immediately.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">10. Changes to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by 
                  posting the new policy on this page and updating the "Last updated" date. Your continued use of our 
                  services after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="mt-3 space-y-1 text-muted-foreground">
                  <p>Email: privacy@travelease.com</p>
                  <p>Phone: 1-800-TRAVEL-00</p>
                  <p>Address: 123 Travel Street, New York, NY 10001</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

    </div>
  );
}
