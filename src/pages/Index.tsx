import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trophy, Users, TrendingUp, ChevronRight, ChevronLeft, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [activeGames] = useState([
    { id: 1, name: "Summer Sale Spin", type: "Spin the Wheel", participants: 1250, status: "Active" },
    { id: 2, name: "Lucky Scratch", type: "Scratch Card", participants: 850, status: "Active" },
    { id: 3, name: "Tech Quiz Pro", type: "Quiz Game", participants: 420, status: "Draft" },
  ]);

  const companiesData = [
    {
      id: "lazada",
      name: "Lazada",
      logo: "🛍️",
      subCompanies: [
        { id: "lazada-mall", name: "Lazada Mall", logo: "🏪"},
        { id: "lazada-global", name: "LazMall Global", logo: "🌍" },
      ],
    },
    {
      id: "shopee",
      name: "Shopee",
      logo: "🛒",
      subCompanies: [
        { id: "shopee-mall", name: "Shopee Mall", logo: "🛒" },
        { id: "shopee-premium", name: "Shopee Premium", logo: "⭐" },
      ],
    },
    {
      id: "amazon",
      name: "Amazon",
      logo: "📦",
      subCompanies: [
        { id: "amazon-prime", name: "Amazon Prime", logo: "📦" },
        { id: "amazon-fresh", name: "Amazon Fresh", logo: "🥬" },
      ],
    },
  ];

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
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">Game Commander</h1>
            <p className="text-sm text-muted-foreground">Marketplace Gaming Platform</p>
          </div>
          <Button
            onClick={() => navigate("/create-challenge")}
            className="bg-brand hover:bg-brand/90"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Game
          </Button>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-3 text-center">
                <Trophy className="h-6 w-6 mx-auto mb-2 text-brand" />
                <p className="text-lg font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Active Games</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-brand" />
                <p className="text-lg font-bold text-foreground">3.2K</p>
                <p className="text-xs text-muted-foreground">Players</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-brand" />
                <p className="text-lg font-bold text-foreground">85%</p>
                <p className="text-xs text-muted-foreground">Engagement</p>
              </CardContent>
            </Card>
          </div>

          {/* Subcompanies Section */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-brand flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  Company Commanders
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/commanders")}
                  className="text-brand hover:text-brand/80"
                >
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              {companiesData.map((company) => (
                <div key={company.id}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm flex items-center gap-1 text-foreground">
                      <span className="text-lg">{company.logo}</span>
                      {company.name}
                    </h4>
                  </div>
                  <div className="relative">
                    <button
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md p-1 rounded-full"
                      onClick={() => scroll(company.id, "left")}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div
                      ref={(el) => (scrollRefs.current[company.id] = el)}
                      className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide px-6"
                    >
                      {company.subCompanies.map((sub) => (
                        <Card
                          key={sub.id}
                          className="min-w-[140px] cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => navigate(`/subcompany/${sub.id}`)}
                        >
                          <CardContent className="p-3 text-center">
                            <div className="text-2xl mb-2">{sub.logo}</div>
                            <h4 className="font-medium text-sm text-foreground mb-1">{sub.name}</h4>
                           
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
              ))}
            </CardContent>
          </Card>

          {/* Recent Games */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-brand">Recent Games</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {activeGames.map((game) => (
                <Card key={game.id} className="hover:shadow-sm transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-foreground">{game.name}</h4>
                        <p className="text-sm text-muted-foreground">{game.type}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{game.participants.toLocaleString()} players</span>
                        </div>
                      </div>
                      <Badge
                        variant={game.status === "Active" ? "default" : "secondary"}
                        className={game.status === "Active" ? "bg-brand text-brand-foreground" : ""}
                      >
                        {game.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Index;
