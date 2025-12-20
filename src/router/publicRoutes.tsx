import type { RouteObject } from "react-router-dom";

import Home from "@/pages/Home";
import About from "@/pages/About";

// feature routes
import Hotels from "./Hotels";
import Flights from "./Flights";
import Holidays from "./Holidays";
import Offers from "./Offers";
import Support from "./Support";
import Account from "./Account";
import PrivacyRoute from "./Privacy";
import Blogs from "./Blogs";
import Buses from "./Buses";
import Contact from "./Contact";
import Terms from "./Terms";
import FAQs from "./FAQs";
import BookingConfirmation from "./BookingConfirmation";
import Checkout from "./Checkout";
import Payment from "./Payment";
import HotelCheckout from "./hotelCheckout";

const publicRoutes: RouteObject[] = [
  { path: "/" , index: true, element: <Home /> , },
  { path: "about", element: <About /> },

  Hotels,
  Flights,
  Holidays,
  Offers,
  Support,
  Account,
  PrivacyRoute,
  Blogs,
  Buses,
  Contact,
  Terms,
  FAQs,
  BookingConfirmation,
  Checkout,
  Payment,
  HotelCheckout,
];

export default publicRoutes;
