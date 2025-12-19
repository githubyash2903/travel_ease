import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plane } from "lucide-react";
import { getPlatformSettings } from "@/api/admin/settings";

export const Footer = () => {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getPlatformSettings();
        setSettings(data);
      } catch (err) {
        console.error("Footer settings error", err);
      }
    };
    loadSettings();
  }, []);

  // ✅ fallback values (UI same)
  const websiteName = settings?.website_name || "TravelEase";
  const email = settings?.email || "support@travelease.com";
  const phone = settings?.contact_no || "+91 1800-123-4567";

  return (
    <footer className="bg-foreground text-background py-4 px-8">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="p-2 rounded-lg bg-primary">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span>{websiteName}</span>
            </Link>

            <p className="text-background/80 text-sm">
              Your trusted partner for seamless travel experiences.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <p className="text-background/80 text-sm">
              Email: {email}
              <br />
              Phone: {phone}
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 pt-5 text-center text-sm text-background/80">
          <p>
            © {new Date().getFullYear()} {websiteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
