import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Save } from "lucide-react";
import { ChallengeBasics } from "@/components/create-challenge/ChallengeBasics";
import { MechanicsSettings } from "@/components/create-challenge/MechanicsSettings";
import { RewardsConfiguration } from "@/components/create-challenge/RewardsConfiguration";
import { ReviewSchedule } from "@/components/create-challenge/ReviewSchedule";
import { toast } from "@/hooks/use-toast";

export interface ChallengeData {
  // Basics
  name: string;
  type: string;
  description: string;
  bannerImage: File | null;
  
  // Mechanics
  instructions: string;
  maxAttemptsPerDay: number | null;
  visibility: "public" | "private";
  inviteOnly?: {
    participants: string[];
    challengeLink: string;
  };
  
  // Rewards - conditional based on type
  rewards: {
    spinWheel?: Array<{ type: 'points' | 'text'; value: string; probability: number }>;
    scratchCard?: Array<{ type: 'points' | 'text'; value: string; probability: number }>;
    buyProducts?: Array<{ productName: string; points: number; label: string }>;
    quiz?: Array<{ question: string; choices: string[]; correctAnswer: number; points: number }>;
    slotMachine?: { points: number; jackpotProbability: number };
    shareToEarn?: { points: number; shareLink: string };
  };
  
  // Schedule
  publishNow: boolean;
  publishDate: Date | null;
  startOnPublish: boolean;
  startDate: Date | null;
  endDate: Date | null;
}

const CreateChallenge = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [challengeData, setChallengeData] = useState<ChallengeData>({
    name: "",
    type: "",
    description: "",
    bannerImage: null,
    instructions: "",
    maxAttemptsPerDay: null,
    visibility: "public",
    inviteOnly: {
      participants: [],
      challengeLink: ""
    },
    rewards: {},
    publishNow: true,
    publishDate: null,
    startOnPublish: true,
    startDate: null,
    endDate: null,
  });

  const sections = [
    { title: "Challenge Basics", component: ChallengeBasics },
    { title: "Mechanics & Settings", component: MechanicsSettings },
    { title: "Rewards Configuration", component: RewardsConfiguration },
    { title: "Review & Schedule", component: ReviewSchedule },
  ];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!challengeData.name || !challengeData.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Challenge Created!",
      description: "Your challenge has been successfully created and scheduled.",
    });
    
    console.log("Challenge Data:", challengeData);
  };

  const updateChallengeData = (updates: Partial<ChallengeData>) => {
    setChallengeData(prev => ({ ...prev, ...updates }));
  };

  const CurrentSectionComponent = sections[currentSection].component;
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen bg-background font-poppins max-w-sm mx-auto border-x border-border">{/* Phone screen container */}
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Create Challenge</h1>
              <p className="text-sm text-muted-foreground">
                {sections[currentSection].title}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Save className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="px-4 pb-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-brand h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {sections.map((section, index) => (
              <span 
                key={index}
                className={index <= currentSection ? "text-brand font-medium" : ""}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 pb-24">
          <CurrentSectionComponent 
            data={challengeData}
            onUpdate={updateChallengeData}
          />
        </div>
      </ScrollArea>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-card border-t border-border p-4">{/* Phone width footer */}
        <div className="flex gap-3">
          {currentSection > 0 && (
            <Button 
              variant="outline" 
              onClick={handlePrev}
              className="flex-1"
            >
              Previous
            </Button>
          )}
          
          {currentSection < sections.length - 1 ? (
            <Button 
              onClick={handleNext}
              className="flex-1 bg-brand hover:bg-brand/90"
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-brand hover:bg-brand/90"
            >
              Create Challenge
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateChallenge;