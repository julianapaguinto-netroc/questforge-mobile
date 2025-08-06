import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronLeft, ChevronRight, Search, Star, MapPin } from "lucide-react";

// Mock grouped data - grouped by parent company
const companiesData = [
  {
    id: "lazada",
    name: "Lazada",
    logo: "🛍️",
    subCompanies: [
      { id: "lazada-mall", name: "Lazada Mall", logo: "🏪", rating: 4.8, location: "Singapore", productsCount: 1250 },
      { id: "lazada-overseas", name: "LazMall", logo: "🛍️", rating: 4.7, location: "Global", productsCount: 890 },
      { id: "lazada-local", name: "Overseas", logo: "🌍", rating: 4.5, location: "International", productsCount: 2100 },
      { id: "lazada-sellers", name: "Local Sellers", logo: "🏬", rating: 4.3, location: "Various", productsCount: 3450 },
    ],
  },
  {
    id: "shopee",
    name: "Shopee",
    logo: "🛒",
    subCompanies: [
      { id: "shopee-mall", name: "Shopee Mall", logo: "🛒", rating: 4.9, location: "Southeast Asia", productsCount: 1680 },
      { id: "shopee-premium", name: "Shopee Premium", logo: "⭐", rating: 4.8, location: "Premium", productsCount: 750 },
    ],
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "📦",
    subCompanies: [
      { id: "amazon-prime", name: "Amazon Prime", logo: "📦", rating: 4.9, location: "Global", productsCount: 5200 },
      { id: "amazon-fresh", name: "Amazon Fresh", logo: "🥬", rating: 4.6, location: "Fresh Delivery", productsCount: 1200 },
    ],
  },
];

const CommandersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scroll = (id: string, direction: "left" | "right") => {
    const container = scrollRefs.current[id];
    if (container) {
      container.scrollBy({ left: direction === "right" ? 200 : -200, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background font-poppins max-w-sm mx-auto border-x border-border">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">All Subcompanies</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search subcompanies..."
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Company Sections */}
      <div className="p-4 space-y-6 pb-24">
        {companiesData.map((company) => {
          const filteredSubCompanies = company.subCompanies.filter((sub) =>
            sub.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filteredSubCompanies.length === 0) return null;

          return (
            <div key={company.id}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-md font-semibold flex items-center gap-1">
                  <span className="text-xl">{company.logo}</span> {company.name}
                </h2>
              </div>

              {/* Scroll Controls */}
              <div className="relative">
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md p-1 rounded-full"
                  onClick={() => scroll(company.id, "left")}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div
                  ref={(el) => (scrollRefs.current[company.id] = el)}
                  className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-6"
                >
                  {filteredSubCompanies.map((sub) => (
                    <Card
                      key={sub.id}
                      className="cursor-pointer min-w-[180px] hover:shadow-md transition-shadow"
                      onClick={() => navigate(`/subcompany/${sub.id}`)}
                    >
                      <CardContent className="p-4 space-y-2">
                        <div className="text-xl">{sub.logo}</div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-sm truncate">{sub.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {sub.rating}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {sub.location}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {sub.productsCount.toLocaleString()} products
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md p-1 rounded-full"
                  onClick={() => scroll(company.id, "right")}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {/* No Results */}
        {companiesData.every(company =>
          company.subCompanies.every(sub => !sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
        ) && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No companies found matching "{searchTerm}"</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CommandersPage;
