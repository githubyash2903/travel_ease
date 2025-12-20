import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

import { getPlatformSettings } from "@/api/admin/settings";

const Contact = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await getPlatformSettings();
        setSettings(res); // ✅ res IS ALREADY data object
      } catch (err) {
        console.error("Settings load failed", err);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!settings) return null;

  return (
    <div className="min-h-screen w-screen flex flex-col">
      <main className="flex-1 container py-12">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* FORM — SAME */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                    <Input type="email" placeholder="Email" />
                    <Textarea rows={6} placeholder="Message" />
                    <Button className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* CONTACT INFO */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">

                  <div className="flex gap-4">
                    <Phone />
                    <p>{settings.contact_no}</p>
                  </div>

                  <div className="flex gap-4">
                    <Mail />
                    <p>{settings.email}</p>
                  </div>

                  <div className="flex gap-4">
                    <MapPin />
                    <p>Mumbai, India</p>
                  </div>

                  <div className="flex gap-4">
                    <Clock />
                    <p>Mon–Fri 9AM–6PM</p>
                  </div>

                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
