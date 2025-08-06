import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Star, MapPin } from "lucide-react";

const CommandersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in real app, fetch from API
  const subCompanies = [
    { id: "lazada-mall", name: "Lazada Mall", logo: "🏪", rating: 4.8, location: "Singapore", productsCount: 1250 },
    { id: "lazada-overseas", name: "LazMall", logo: "🛍️", rating: 4.7, location: "Global", productsCount: 890 },
    { id: "lazada-local", name: "Overseas", logo: "🌍", rating: 4.5, location: "International", productsCount: 2100 },
    { id: "lazada-sellers", name: "Local Sellers", logo: "🏬", rating: 4.3, location: "Various", productsCount: 3450 },
    { id: "shopee-mall", name: "Shopee Mall", logo: "🛒", rating: 4.9, location: "Southeast Asia", productsCount: 1680 },
    { id: "shopee-premium", name: "Shopee Premium", logo: "⭐", rating: 4.8, location: "Premium", productsCount: 750 },
    { id: "amazon-prime", name: "Amazon Prime", logo: "📦", rating: 4.9, location: "Global", productsCount: 5200 },
    { id: "amazon-fresh", name: "Amazon Fresh", logo: "🥬", rating: 4.6, location: "Fresh Delivery", productsCount: 1200 },
  ];

  const filteredCompanies = subCompanies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background font-poppins max-w-sm mx-auto border-x border-border">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">All Subcompanies</h1>
            <p className="text-sm text-muted-foreground">{filteredCompanies.length} companies available</p>
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

      {/* Companies List */}
      <div className="p-4 space-y-3 pb-24">
        {filteredCompanies.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No companies found matching "{searchTerm}"</p>
            </CardContent>
          </Card>
        ) : (
          filteredCompanies.map((company) => (
            <Card 
              key={company.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/subcompany/${company.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{company.logo}</div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-foreground">{company.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {company.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {company.location}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {company.productsCount.toLocaleString()} products
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommandersPage;