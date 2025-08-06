import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trophy, Users, TrendingUp, ChevronRight, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  const [activeGames] = useState([
    { id: 1, name: "Summer Sale Spin", type: "Spin the Wheel", participants: 1250, status: "Active" },
    { id: 2, name: "Lucky Scratch", type: "Scratch Card", participants: 850, status: "Active" },
    { id: 3, name: "Tech Quiz Pro", type: "Quiz Game", participants: 420, status: "Draft" },
  ]);

  const subCompanies = [
    { id: "lazada-mall", name: "Lazada Mall", logo: "🏪", subCount: 4 },
    { id: "shopee-mall", name: "Shopee Mall", logo: "🛒", subCount: 3 },
    { id: "amazon-prime", name: "Amazon Prime", logo: "📦", subCount: 2 },
    { id: "tokopedia", name: "Tokopedia", logo: "🛍️", subCount: 3 },
  ];

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
                  Subcompanies
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
            <CardContent className="pt-0">
              <ScrollArea className="w-full">
                <div className="flex gap-3 pb-2">
                  {subCompanies.map((company) => (
                    <Card 
                      key={company.id}
                      className="min-w-[140px] cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => navigate(`/subcompany/${company.id}`)}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="text-2xl mb-2">{company.logo}</div>
                        <h4 className="font-medium text-sm text-foreground mb-1">{company.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {company.subCount} sub-companies
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
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