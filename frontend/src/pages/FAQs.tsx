import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, HelpCircle, Plane, Hotel, CreditCard, Shield } from "lucide-react";
import { useState } from "react";

export default function FAQs() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      icon: Plane,
      title: "Flight Bookings",
      color: "text-blue-600",
      faqs: [
        {
          question: "How do I book a flight on TravelEase?",
          answer: "To book a flight, go to our homepage, enter your departure and destination cities, select your travel dates, and click 'Search Flights'. Browse the available options, select your preferred flight, and proceed to checkout. You'll need to provide passenger details and payment information to complete your booking."
        },
        {
          question: "Can I modify or cancel my flight booking?",
          answer: "Yes, you can modify or cancel your flight booking from the 'My Bookings' section in your dashboard. Please note that modifications and cancellations are subject to airline policies and may incur fees. We recommend reviewing the fare rules before making changes."
        },
        {
          question: "What documents do I need for international flights?",
          answer: "For international flights, you'll need a valid passport with at least 6 months validity from your travel date. Depending on your destination, you may also need a visa, vaccination certificates, or other travel documents. Always check the entry requirements for your destination country before booking."
        },
        {
          question: "How early should I arrive at the airport?",
          answer: "For domestic flights, we recommend arriving at least 2 hours before departure. For international flights, arrive at least 3 hours before departure. This allows sufficient time for check-in, security screening, and boarding."
        }
      ]
    },
    {
      icon: Hotel,
      title: "Hotel Bookings",
      color: "text-purple-600",
      faqs: [
        {
          question: "What is included in the hotel room rate?",
          answer: "Room rates typically include accommodation and basic amenities. Some hotels offer complimentary breakfast, WiFi, and parking. Additional services like spa treatments, minibar items, or room service are usually charged separately. Check the hotel details page for specific inclusions."
        },
        {
          question: "Can I request early check-in or late check-out?",
          answer: "Early check-in and late check-out are subject to availability and hotel policies. You can request these services by contacting the hotel directly or through our customer support team. Additional charges may apply."
        },
        {
          question: "What is the hotel cancellation policy?",
          answer: "Cancellation policies vary by hotel and rate type. Most hotels offer free cancellation up to 24-48 hours before check-in. Non-refundable rates typically offer lower prices but don't allow cancellations. Always review the cancellation policy before booking."
        },
        {
          question: "Are pets allowed in hotels?",
          answer: "Pet policies vary by hotel. Some hotels are pet-friendly and may charge an additional fee for pets. Check the hotel details page for specific pet policies or contact the hotel directly for more information."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Payment & Pricing",
      color: "text-green-600",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept major credit cards (Visa, Mastercard, American Express), debit cards, and various digital payment methods. Payment is processed securely through our encrypted payment gateway."
        },
        {
          question: "Are there any hidden charges?",
          answer: "No, we believe in transparent pricing. The total amount shown at checkout includes all applicable taxes and fees. Any optional services or extras will be clearly marked and can be added or removed at your discretion."
        },
        {
          question: "Can I get a refund if I cancel my booking?",
          answer: "Refunds depend on the booking type and cancellation policy. Flexible fares typically allow refunds with minimal fees, while discounted or promotional fares may be non-refundable. Review the cancellation policy during booking for specific terms."
        },
        {
          question: "Do you offer group booking discounts?",
          answer: "Yes, we offer special rates for group bookings. For groups of 10 or more travelers, please contact our corporate travel team for customized quotes and special group rates."
        }
      ]
    },
    {
      icon: Shield,
      title: "Safety & Security",
      color: "text-orange-600",
      faqs: [
        {
          question: "Is my payment information secure?",
          answer: "Absolutely. We use industry-standard SSL encryption to protect all payment transactions. Your credit card information is never stored on our servers and is processed through PCI-DSS compliant payment gateways."
        },
        {
          question: "How do I know my booking is confirmed?",
          answer: "Once your payment is processed, you'll receive a confirmation email with your booking details and reference number. You can also view your bookings in the 'My Bookings' section of your dashboard."
        },
        {
          question: "What should I do if I don't receive a confirmation email?",
          answer: "First, check your spam or junk folder. If you still can't find it, log into your account and check 'My Bookings' to verify your reservation. You can also contact our support team with your booking reference number for assistance."
        },
        {
          question: "Do you offer travel insurance?",
          answer: "Yes, we offer optional travel insurance that covers trip cancellations, medical emergencies, lost baggage, and more. You can add travel insurance during the booking process for comprehensive protection."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
   
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16 px-4">
          <div className="container text-center">
            <HelpCircle className="h-16 w-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Find answers to common questions about booking flights, hotels, and more
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for answers..."
                className="pl-10 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-12 px-4">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {faqCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6 text-center">
                      <div className={`inline-flex p-3 rounded-full bg-primary/10 mb-3 ${category.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold">{category.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.faqs.length} questions
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* FAQ Accordions */}
            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <div key={categoryIndex}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-2 rounded-lg bg-primary/10 ${category.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-2xl font-bold">{category.title}</h2>
                    </div>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.faqs
                        .filter(faq => 
                          searchQuery === "" || 
                          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((faq, faqIndex) => (
                          <AccordionItem 
                            key={faqIndex} 
                            value={`${categoryIndex}-${faqIndex}`}
                            className="border rounded-lg px-6"
                          >
                            <AccordionTrigger className="text-left hover:no-underline">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                    </Accordion>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container">
            <Card>
              <CardContent className="pt-6 text-center">
                <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
                <p className="text-muted-foreground mb-6">
                  Can't find the answer you're looking for? Our customer support team is here to help.
                </p>
                <Button size="lg" asChild>
                  <a href="/contact">Contact Support</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

    
    </div>
  );
}
