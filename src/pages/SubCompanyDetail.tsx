import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, MapPin, Clock } from "lucide-react";

const SubCompanyDetail = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API
  const companiesData: { [key: string]: any } = {
    puma: {
      id: "puma",
      name: "Puma",
      logo: "🏪",
      rating: 4.7,
      location: "Germany",
      description: "Global athletic brand offering high-performance sportswear, footwear, and accessories. Shop the latest collections from Puma's innovative sports technology.",
      joinedDate: "2020",
      products: [
        { id: 1, name: "Puma RS-X Sneakers", points: 7500, image: "👟", category: "Footwear" },
        { id: 2, name: "Puma Training Set", points: 5200, image: "👕", category: "Apparel" },
        { id: 3, name: "Puma Football Boots", points: 8900, image: "⚽", category: "Footwear" },
        { id: 4, name: "Puma Sports Backpack", points: 3500, image: "🎒", category: "Accessories" },
        { id: 5, name: "Puma Running Shorts", points: 2800, image: "🩳", category: "Apparel" },
        { id: 6, name: "Puma Cap", points: 1500, image: "🧢", category: "Accessories" },
      ]
    },
    nestle: {
      id: "nestle",
      name: "Nestle Store",
      logo: "🌍",
      rating: 4.6,
      location: "Switzerland",
      description: "World's leading nutrition, health and wellness company. Discover premium food and beverage products from trusted Nestle brands.",
      joinedDate: "2018",
      products: [
        { id: 1, name: "Nescafe Gold Coffee", points: 1200, image: "☕", category: "Beverages" },
        { id: 2, name: "KitKat Chocolate Bar", points: 500, image: "🍫", category: "Confectionery" },
        { id: 3, name: "Maggi Instant Noodles", points: 800, image: "🍜", category: "Food" },
        { id: 4, name: "Milo Energy Drink", points: 900, image: "🥤", category: "Beverages" },
        { id: 5, name: "Nestle Cereal Box", points: 1500, image: "🥣", category: "Food" },
        { id: 6, name: "Nestle Water Bottle", points: 300, image: "💧", category: "Beverages" },
      ]
    },
    Nike: {
      id: "Nike",
      name: "Nike",
      logo: "🛍️",
      rating: 4.9,
      location: "United States",
      description: "Just Do It. Global leader in athletic footwear, apparel, equipment and accessories. Experience innovation and performance with Nike's cutting-edge sports technology.",
      joinedDate: "2019",
      products: [
        { id: 1, name: "Nike Air Max 270", points: 9500, image: "👟", category: "Footwear" },
        { id: 2, name: "Nike Dri-FIT Shirt", points: 4200, image: "👕", category: "Apparel" },
        { id: 3, name: "Nike Air Jordan 1", points: 12000, image: "👟", category: "Footwear" },
        { id: 4, name: "Nike Sports Bra", points: 3500, image: "👙", category: "Apparel" },
        { id: 5, name: "Nike Running Jacket", points: 6800, image: "🧥", category: "Apparel" },
        { id: 6, name: "Nike Gym Bag", points: 4500, image: "👜", category: "Accessories" },
      ]
    },
    uniqlo: {
      id: "uniqlo",
      name: "Uniqlo",
      logo: "🏬",
      rating: 4.5,
      location: "Japan",
      description: "LifeWear for everyone. Simple, high-quality clothing designed to improve daily life. Discover innovative fabrics and timeless designs from Uniqlo.",
      joinedDate: "2021",
      products: [
        { id: 1, name: "Uniqlo Heattech Shirt", points: 2800, image: "👕", category: "Apparel" },
        { id: 2, name: "Uniqlo Ultra Light Down", points: 5500, image: "🧥", category: "Outerwear" },
        { id: 3, name: "Uniqlo Airism T-Shirt", points: 2200, image: "👕", category: "Apparel" },
        { id: 4, name: "Uniqlo Jeans", points: 4200, image: "👖", category: "Apparel" },
        { id: 5, name: "Uniqlo Fleece Jacket", points: 3800, image: "🧥", category: "Outerwear" },
        { id: 6, name: "Uniqlo Socks Pack", points: 1200, image: "🧦", category: "Accessories" },
      ]
    }
  };

  const company = companiesData[companyId as string] || {
    id: companyId,
    name: "Store Not Found",
    logo: "❓",
    rating: 0,
    location: "Unknown",
    description: "This store is not available.",
    joinedDate: "2024",
    products: []
  };

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
            <h1 className="text-lg font-semibold text-foreground">Company Details</h1>
          </div>
        </div>
      </div>

      {/* Company Header */}
      <div className="p-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="text-3xl">{company.logo}</div>
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-bold text-foreground">{company.name}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {company.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {company.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Since {company.joinedDate}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="px-4 pb-6">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-brand">About {company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {company.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Available Products</h3>
              <Badge variant="secondary">{company.products.length} items</Badge>
            </div>

            {company.products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{product.image}</div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium text-foreground">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-brand">
                            {product.points.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">points</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SubCompanyDetail;