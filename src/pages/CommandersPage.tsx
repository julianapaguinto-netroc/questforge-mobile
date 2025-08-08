import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Star, MapPin } from "lucide-react";

// Mock grouped data - grouped by parent company
const companiesData = [
  {
    id: "lazada",
    name: "Lazada",
    logo: "🛍️",
    subCompanies: [
      { id: "puma", name: "Puma", logo: "🏪", rating: 4.8, location: "Singapore", productsCount: 1250 },
      { id: "Nike", name: "Nike", logo: "🛍️", rating: 4.7, location: "Global", productsCount: 890 },
      { id: "nestle", name: "Nestle Store", logo: "🌍", rating: 4.5, location: "International", productsCount: 2100 },
      { id: "uniqlo", name: "Uniqlo", logo: "🏬", rating: 4.3, location: "Various", productsCount: 3450 },
    ],
  },
];

const CommandersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

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
              <div className="mb-2">
                <h2 className="text-md font-semibold flex items-center gap-1">
                  <span className="text-xl">{company.logo}</span> {company.name}
                </h2>
              </div>

              {/* Vertical List */}
              <div className="flex flex-col gap-3">
                {filteredSubCompanies.map((sub) => (
                  <Card
                    key={sub.id}
                    className="cursor-pointer w-full hover:shadow-md transition-shadow"
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
