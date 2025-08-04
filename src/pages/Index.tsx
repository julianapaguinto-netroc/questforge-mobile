import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Plus, Target, Users, Trophy } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background font-poppins">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-foreground">Challenge Commander</h1>
          <p className="text-sm text-muted-foreground">Create and manage gamified rewards challenges</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/create-challenge')}
              className="w-full bg-brand hover:bg-brand/90 text-brand-foreground"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Challenge
            </Button>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-light rounded-lg">
                  <Target className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Challenges</p>
                  <p className="text-lg font-semibold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-light rounded-lg">
                  <Users className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Participants</p>
                  <p className="text-lg font-semibold">2,847</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-light rounded-lg">
                  <Trophy className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rewards Distributed</p>
                  <p className="text-lg font-semibold">15,392</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Challenges */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Challenges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Daily Spin Challenge", type: "Spin the Wheel", participants: 234 },
              { name: "Product Hunt", type: "Buy Products", participants: 89 },
              { name: "Knowledge Quiz", type: "Quiz Challenge", participants: 156 }
            ].map((challenge, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div>
                  <p className="font-medium text-sm">{challenge.name}</p>
                  <p className="text-xs text-muted-foreground">{challenge.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{challenge.participants}</p>
                  <p className="text-xs text-muted-foreground">participants</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
