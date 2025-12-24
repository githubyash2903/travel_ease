import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageSquare } from "lucide-react";

// --- Mock Data for FAQs ---
const faqs = [
  {
    question: "How do I cancel my booking?",
    answer:
      "You can cancel your booking by logging into your account, navigating to 'My Bookings', and selecting the 'Cancel' option. Please check the cancellation policy for any potential fees.",
  },
  {
    question: "Can I change the dates for my trip?",
    answer:
      "Date changes are subject to availability and the specific policy of the airline or hotel. Please contact our support team with your booking ID, and we will assist you with your request.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "Refunds depend on the cancellation policy of your specific booking. Once a cancellation is confirmed, eligible refunds are typically processed within 5-10 business days.",
  },
  {
    question: "Do I need travel insurance?",
    answer:
      "We highly recommend purchasing travel insurance for all international trips. It provides coverage for medical emergencies, trip cancellations, lost baggage, and other unforeseen events.",
  },
];

const Support = () => {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-muted/40">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Center</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We're here to help. Find answers to your questions, get in touch with our team, or submit a support request.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Options Section */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Mail className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Send us your questions, and we'll get back to you within 24 hours.</p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button asChild>
                  <a href="mailto:support@travelease.com">Email Us</a>
                </Button>
              </CardFooter>
            </Card>

            {/* Phone */}
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Phone className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>Phone Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Speak directly with one of our support agents 24/7.</p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button asChild>
                  <a href="tel:+123456789">Call Now</a>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Live Chat */}
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <MessageSquare className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Get instant answers to your questions from our live chat team.</p>
              </CardContent>
              <CardFooter className="justify-center">
               <Button asChild>
                  <a href="/support">Chat Us</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Submit a Support Request</h2>
          <Card>
            <CardHeader>
              <CardTitle>Support Form</CardTitle>
              <CardDescription>
                Please fill out the form below, and our team will get back to you.
              </CardDescription>
            </CardHeader>
            <form onSubmit={(e) => e.preventDefault()}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="booking-id">Booking ID (Optional)</Label>
                  <Input id="booking-id" placeholder="TE-12345" />
                </div>
                <div className="space-y-2 pb-4">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea id="message" placeholder="Please describe your issue..." rows={6} />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-ful pt-4 md:w-auto">Submit Request</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Support;