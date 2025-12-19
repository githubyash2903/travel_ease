
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import journyimage from "@/assets/journy-image.jpg";


const teamMembers = [
  {
    name: "Jane Doe",
    role: "Founder & CEO",
    avatar: "https://placehold.co/100x100/A0BFD8/333333?text=JD",
    fallback: "JD",
  },
  {
    name: "John Smith",
    role: "Lead Travel Specialist",
    avatar: "https://placehold.co/100x100/D8A0A0/333333?text=JS",
    fallback: "JS",
  },
  {
    name: "Alice Johnson",
    role: "Head of Customer Support",
    avatar: "https://placehold.co/100x100/A0D8B8/333333?text=AJ",
    fallback: "AJ",
  },
  {
    name: "Mike Brown",
    role: "Marketing Director",
    avatar: "https://placehold.co/100x100/D8C6A0/333333?text=MB",
    fallback: "MB",
  },
];


const coreValues = [
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Passion for Travel",
    description: "We believe in the transformative power of travel and are passionate about sharing it.",
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Safety & Reliability",
    description: "Your safety and trust are our top priorities. We only work with vetted partners.",
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Global Expertise",
    description: "Our team's firsthand knowledge creates authentic, unforgettable experiences.",
  },
];

const About = () => {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-20 bg md:py-32 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About TravelEase</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We are a passionate team of travel experts dedicated to crafting your perfect journey, one adventure at a time.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2010, TravelEase started with a simple idea: to make travel accessible, enjoyable, and truly personal. We were tired of one-size-fits-all packages and knew there was a better way to explore the world.
            </p>
            <p className="text-muted-foreground">
              Today, we've helped thousands of travelers discover hidden gems, climb towering peaks, and relax on sun-soaked beaches. Our mission is to handle all the details so you can focus on making memories.
            </p>
          </div>
          <div>
            {/* You can replace this placeholder with a real image */}
            <img
              src={journyimage}
              alt="Our Journey"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center border-0 shadow-lg">
                <CardContent className="pt-6 flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.fallback}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value) => (
              <Card key={value.title} className="text-center border-0 shadow-none bg-transparent">
                <CardHeader>
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-blue-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Let our experts plan the trip of a lifetime for you. Browse our top destinations or get in touch for a custom quote.
          </p>
          <Button size="lg" variant="outline" asChild>
            <Link to="/holidays">Explore Destinations</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default About;