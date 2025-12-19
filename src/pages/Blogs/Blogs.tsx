import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, User, Search, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Southeast Asia",
    excerpt: "Discover the most beautiful and lesser-known destinations in Southeast Asia that will take your breath away.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    category: "Destinations",
    image: "/src/assets/dest-nature.jpg",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Budget Travel Tips for European Adventures",
    excerpt: "Learn how to explore Europe on a budget without compromising on experiences.",
    author: "Michael Chen",
    date: "March 10, 2024",
    category: "Travel Tips",
    image: "/src/assets/dest-city.jpg",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Best Beach Destinations for 2024",
    excerpt: "Planning a beach vacation? Here are the top coastal destinations you should visit this year.",
    author: "Emma Williams",
    date: "March 5, 2024",
    category: "Beach Travel",
    image: "/src/assets/dest-coastal.jpg",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Mountain Trekking Guide for Beginners",
    excerpt: "Everything you need to know before embarking on your first mountain trek.",
    author: "David Brown",
    date: "February 28, 2024",
    category: "Adventure",
    image: "/src/assets/dest-mountains.jpg",
    readTime: "8 min read"
  },
  {
    id: 5,
    title: "Cultural Experiences You Can't Miss",
    excerpt: "Immerse yourself in local cultures with these authentic travel experiences.",
    author: "Lisa Anderson",
    date: "February 20, 2024",
    category: "Culture",
    image: "/src/assets/dest-nature.jpg",
    readTime: "5 min read"
  },
  {
    id: 6,
    title: "Solo Travel Safety Tips",
    excerpt: "Essential safety tips for solo travelers exploring the world.",
    author: "James Wilson",
    date: "February 15, 2024",
    category: "Travel Tips",
    image: "/src/assets/dest-city.jpg",
    readTime: "6 min read"
  }
];

const categories = ["All", "Destinations", "Travel Tips", "Beach Travel", "Adventure", "Culture"];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen justify-center items-center text-center flex flex-col">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-blue-400 py-16 px-4">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              Travel Blog & Guides
            </h1>
            <p className="text-white/90 text-lg text-center max-w-2xl mx-auto mb-8">
              Discover travel tips, destination guides, and inspiring stories from around the world
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-5 px-5 border-b">
          <div className="container">
            <div className="flex gap-3  overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  className="whitespace-nowrap"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12">
          <div className="container">
             {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No blog posts found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/blogs/${post.id}`}>
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      </div>
                      <Link to={`/blogs/${post.id}`}>
                        <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                      </Link>
                      <CardDescription className="line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1" asChild>
                          <Link to={`/blogs/${post.id}`}>
                            Read <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
