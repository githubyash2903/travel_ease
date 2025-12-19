import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Southeast Asia",
    excerpt: "Discover the most beautiful and lesser-known destinations in Southeast Asia that will take your breath away.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    category: "Destinations",
    image: "/src/assets/dest-nature.jpg",
    readTime: "5 min read",
    content: `
      <p>Southeast Asia is home to some of the world's most incredible destinations, but beyond the popular tourist spots lie hidden gems waiting to be discovered. In this comprehensive guide, we'll explore 10 lesser-known destinations that offer authentic experiences and breathtaking beauty.</p>
      
      <h2>1. Kampot, Cambodia</h2>
      <p>This riverside town is famous for its pepper plantations and French colonial architecture. The laid-back atmosphere makes it perfect for those seeking a peaceful retreat away from the crowds.</p>
      
      <h2>2. Hsipaw, Myanmar</h2>
      <p>A small town in the Shan State offering incredible trekking opportunities through tea plantations and hill tribe villages. The journey here is an adventure in itself.</p>
      
      <h2>3. Koh Rong Sanloem, Cambodia</h2>
      <p>While Koh Rong gets all the attention, its smaller sister island offers pristine beaches and crystal-clear waters with fewer tourists. Perfect for snorkeling and diving enthusiasts.</p>
      
      <h2>4. Pai, Thailand</h2>
      <p>Nestled in the mountains of northern Thailand, Pai is a bohemian paradise known for its hot springs, waterfalls, and vibrant arts scene.</p>
      
      <h2>5. Sekumpul Waterfall, Bali</h2>
      <p>Often overlooked by tourists rushing to more famous spots, this waterfall is considered by many to be the most beautiful in Bali. The trek to reach it is challenging but absolutely worth it.</p>
      
      <h2>Conclusion</h2>
      <p>These hidden gems offer a chance to experience Southeast Asia beyond the typical tourist trail. Whether you're seeking adventure, relaxation, or cultural immersion, these destinations provide authentic experiences that will create lasting memories.</p>
    `
  },
  {
    id: 2,
    title: "Budget Travel Tips for European Adventures",
    excerpt: "Learn how to explore Europe on a budget without compromising on experiences.",
    author: "Michael Chen",
    date: "March 10, 2024",
    category: "Travel Tips",
    image: "/src/assets/dest-city.jpg",
    readTime: "7 min read",
    content: `
      <p>Traveling through Europe doesn't have to break the bank. With careful planning and smart choices, you can explore this diverse continent on a budget while still having incredible experiences.</p>
      
      <h2>Transportation Hacks</h2>
      <p>One of the biggest expenses when traveling through Europe is transportation. Instead of flying between cities, consider taking buses or trains. Companies like FlixBus and Interrail offer affordable options that also allow you to see the countryside.</p>
      
      <h2>Accommodation Strategies</h2>
      <p>Hostels are not just for young backpackers anymore. Many modern hostels offer private rooms and excellent facilities at a fraction of hotel costs. Alternatively, consider house-sitting or home exchanges for longer stays.</p>
      
      <h2>Eating on a Budget</h2>
      <p>Skip the tourist restaurants and eat where locals eat. Visit markets for fresh, affordable ingredients and prepare some of your own meals. Many European cities also have excellent street food scenes.</p>
      
      <h2>Free Activities</h2>
      <p>Many European museums offer free entry on certain days or times. Walking tours (tip-based) are available in most major cities. Parks, markets, and architectural landmarks are always free to explore.</p>
      
      <h2>Best Budget Destinations</h2>
      <p>Eastern Europe offers incredible value for money. Countries like Poland, Hungary, and Romania provide rich history, beautiful cities, and delicious food at very affordable prices.</p>
    `
  },
  {
    id: 3,
    title: "Best Beach Destinations for 2024",
    excerpt: "Planning a beach vacation? Here are the top coastal destinations you should visit this year.",
    author: "Emma Williams",
    date: "March 5, 2024",
    category: "Beach Travel",
    image: "/src/assets/dest-coastal.jpg",
    readTime: "6 min read",
    content: `
      <p>2024 is shaping up to be an incredible year for beach lovers. From pristine white sands to turquoise waters, we've compiled a list of the best beach destinations to visit this year.</p>
      
      <h2>Maldives</h2>
      <p>The Maldives continues to be a top choice for luxury beach vacations. With over 1,000 islands, you'll find everything from budget-friendly guesthouses to ultra-luxury overwater bungalows.</p>
      
      <h2>Algarve, Portugal</h2>
      <p>Portugal's southern coast offers dramatic cliffs, golden beaches, and charming fishing villages. The Algarve is perfect for those seeking European beach culture with excellent value.</p>
      
      <h2>Siargao, Philippines</h2>
      <p>Known as the surfing capital of the Philippines, Siargao has evolved into a complete beach destination with pristine beaches, island hopping opportunities, and a laid-back vibe.</p>
      
      <h2>Zanzibar, Tanzania</h2>
      <p>This East African archipelago combines beautiful beaches with rich culture and history. The spice tours and Stone Town exploration add depth to any beach vacation.</p>
      
      <h2>Tulum, Mexico</h2>
      <p>Tulum offers the perfect mix of beaches and culture, with ancient Mayan ruins overlooking the Caribbean Sea. The eco-conscious development ensures the area maintains its natural beauty.</p>
    `
  },
  {
    id: 4,
    title: "Mountain Trekking Guide for Beginners",
    excerpt: "Everything you need to know before embarking on your first mountain trek.",
    author: "David Brown",
    date: "February 28, 2024",
    category: "Adventure",
    image: "/src/assets/dest-mountains.jpg",
    readTime: "8 min read",
    content: `
      <p>Mountain trekking is an incredibly rewarding experience, but proper preparation is essential for beginners. This comprehensive guide will help you prepare for your first trek.</p>
      
      <h2>Physical Preparation</h2>
      <p>Start training at least 2-3 months before your trek. Focus on cardiovascular fitness, leg strength, and endurance. Regular hiking on local trails is the best preparation.</p>
      
      <h2>Essential Gear</h2>
      <p>Invest in quality hiking boots and break them in before your trek. Layer your clothing for varying temperatures. Don't forget essentials like a good backpack, sleeping bag, and trekking poles.</p>
      
      <h2>Altitude Considerations</h2>
      <p>Altitude sickness is a real concern on high-altitude treks. Take time to acclimatize, stay hydrated, and don't push yourself too hard. Know the symptoms and when to descend.</p>
      
      <h2>Best Beginner Treks</h2>
      <ul>
        <li>Poon Hill Trek, Nepal - 4-5 days</li>
        <li>Inca Trail to Machu Picchu, Peru - 4 days</li>
        <li>Mount Kilimanjaro (Marangu Route), Tanzania - 5-6 days</li>
        <li>Tour du Mont Blanc, France/Italy/Switzerland - 7-11 days</li>
      </ul>
      
      <h2>Leave No Trace</h2>
      <p>Respect the mountains and follow Leave No Trace principles. Pack out all trash, stay on marked trails, and be mindful of your impact on these fragile environments.</p>
    `
  },
  {
    id: 5,
    title: "Cultural Experiences You Can't Miss",
    excerpt: "Immerse yourself in local cultures with these authentic travel experiences.",
    author: "Lisa Anderson",
    date: "February 20, 2024",
    category: "Culture",
    image: "/src/assets/dest-nature.jpg",
    readTime: "5 min read",
    content: `
      <p>True travel is about connecting with local cultures and gaining new perspectives. These authentic cultural experiences will enrich your understanding of the world.</p>
      
      <h2>Stay with Local Families</h2>
      <p>Homestays offer unparalleled insights into daily life. From rural villages in Vietnam to urban homes in Morocco, living with locals creates meaningful connections.</p>
      
      <h2>Learn Traditional Crafts</h2>
      <p>Take workshops to learn pottery in Japan, weaving in Guatemala, or cooking in Italy. These hands-on experiences support local artisans and create lasting memories.</p>
      
      <h2>Attend Local Festivals</h2>
      <p>Time your travels to coincide with traditional festivals. Whether it's Holi in India, Carnival in Brazil, or the Lantern Festival in Thailand, festivals showcase cultural heritage.</p>
      
      <h2>Visit Community Projects</h2>
      <p>Many communities welcome respectful visitors to their sustainable development projects. This type of tourism supports local initiatives while providing cultural exchange.</p>
      
      <h2>Market Exploration</h2>
      <p>Local markets are cultural hubs where you can observe daily life, taste regional specialties, and practice bargaining skills while supporting small vendors.</p>
    `
  },
  {
    id: 6,
    title: "Solo Travel Safety Tips",
    excerpt: "Essential safety tips for solo travelers exploring the world.",
    author: "James Wilson",
    date: "February 15, 2024",
    category: "Travel Tips",
    image: "/src/assets/dest-city.jpg",
    readTime: "6 min read",
    content: `
      <p>Solo travel is one of the most empowering experiences, but staying safe should always be your priority. Here are essential safety tips for solo adventurers.</p>
      
      <h2>Before You Go</h2>
      <p>Research your destination thoroughly. Register with your embassy, share your itinerary with trusted contacts, and ensure you have comprehensive travel insurance.</p>
      
      <h2>Accommodation Safety</h2>
      <p>Choose accommodations in safe neighborhoods with good reviews from solo travelers. Hostels are great for meeting other travelers, while hotels offer more privacy.</p>
      
      <h2>Stay Connected</h2>
      <p>Keep your phone charged and ensure you have local emergency numbers saved. Consider getting a local SIM card for reliable communication.</p>
      
      <h2>Trust Your Instincts</h2>
      <p>If something feels wrong, remove yourself from the situation. It's better to be overly cautious than to ignore warning signs.</p>
      
      <h2>Blend In</h2>
      <p>Try not to stand out as a tourist. Keep expensive items hidden, dress appropriately for the local culture, and be aware of common scams in your destination.</p>
      
      <h2>Meet Other Travelers</h2>
      <p>Join group tours or activities to meet fellow travelers. Many cities have social events specifically for travelers and expats.</p>
    `
  }
];

export default function BlogDetail() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blogs
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen  flex flex-col">
      
      <main className="flex-1">
        {/* Hero Section with Featured Image */}
        <section className="relative h-[400px] md:h-[500px]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container py-8">
            <Button variant="ghost" size="sm" className="mb-4" asChild>
              <Link to="/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blogs
              </Link>
            </Button>
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
              {post.title}
            </h1>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 px-4">
          <div className="container text-center max-w-4xl">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center  gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Share Buttons */}
            <Card className="mb-8">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Share2 className="h-4 w-4" />
                  <span>Share this article</span>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Article Body */}
            <div 
              className="text-center"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <Separator className="my-12" />

            {/* Author Bio */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    {post.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{post.author}</h3>
                    <p className="text-muted-foreground text-sm">
                      Travel writer and photographer passionate about discovering hidden gems and sharing authentic travel experiences with the world.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Posts */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts
                  .filter((p) => p.category === post.category && p.id !== post.id)
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <Link to={`/blogs/${relatedPost.id}`}>
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <Badge variant="secondary" className="mb-2">
                            {relatedPost.category}
                          </Badge>
                          <h3 className="font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>

     
    </div>
  );
}