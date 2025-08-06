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
  const company = {
    id: companyId,
    name: "Lazada Mall",
    logo: "🏪",
    rating: 4.8,
    location: "Singapore",
    description: "Official flagship stores with guaranteed authenticity and premium service. Enjoy exclusive deals, faster shipping, and reliable customer support.",
    joinedDate: "2019",
    products: [
      { id: 1, name: "iPhone 14 Pro", points: 15000, image: "📱", category: "Electronics" },
      { id: 2, name: "Nike Air Jordan", points: 8500, image: "👟", category: "Fashion" },
      { id: 3, name: "MacBook Pro M2", points: 25000, image: "💻", category: "Electronics" },
      { id: 4, name: "Samsung Galaxy S23", points: 12000, image: "📱", category: "Electronics" },
      { id: 5, name: "Adidas Ultraboost", points: 6500, image: "👟", category: "Fashion" },
      { id: 6, name: "Sony WH-1000XM4", points: 4500, image: "🎧", category: "Electronics" },
    ]
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