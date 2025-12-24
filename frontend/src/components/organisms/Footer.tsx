import { Link } from "react-router-dom";
import { Plane, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="p-2 rounded-lg bg-primary">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span>TravelEase</span>
            </Link>
            <p className="text-background/80 text-sm">
              Your trusted partner for seamless travel experiences. Book flights, hotels, and holidays with ease.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/flights" className="text-background/80 hover:text-background transition-colors">
                  Flights
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-background/80 hover:text-background transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/holidays" className="text-background/80 hover:text-background transition-colors">
                  Holidays
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-background/80 hover:text-background transition-colors">
                  Offers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-background/80 hover:text-background transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-background/80 hover:text-background transition-colors">
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/80 hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-background/80 hover:text-background transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-background/80 hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-background/80 hover:text-background transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-background/80 text-sm">
              Email: support@travelease.com
              <br />
              Phone: +91 1800-123-4567
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/80">
          <p>&copy; {new Date().getFullYear()} TravelEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
