import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { GlobalRewardFields } from "./GlobalRewardFields";
import type { ChallengeData } from "@/pages/CreateChallenge";

interface RewardsConfigurationProps {
  data: ChallengeData;
  onUpdate: (updates: Partial<ChallengeData>) => void;
}

export const RewardsConfiguration = ({ data, onUpdate }: RewardsConfigurationProps) => {
  const [newOutcome, setNewOutcome] = useState({ 
    type: 'points' as 'points' | 'text' | 'offers' | 'discount', 
    value: "",
    probability: 10,
    productName: "",
    discountPercentage: 0,
    offerDescription: "",
    applicableCompanies: []
  });
  const [newProduct, setNewProduct] = useState({ name: "", points: 0 });
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    choices: ["", "", "", ""],
    correctAnswer: 0,
    points: 0
  });

  const updateRewards = (rewardType: string, rewards: any) => {
    onUpdate({
      rewards: {
        ...data.rewards,
        [rewardType]: rewards
      }
    });
  };

  const addOutcome = (type: 'spinWheel' | 'scratchCard') => {
    if (!newOutcome.value.trim()) return;
    
    const currentOutcomes = data.rewards[type] || [];
    const newOutcomes = [...currentOutcomes, { 
      ...newOutcome,
      probability: 10 
    }];
    updateRewards(type, newOutcomes);
    setNewOutcome({
      type: 'points',
      value: "",
      probability: 10,
      productName: "",
      discountPercentage: 0,
      offerDescription: "",
      applicableCompanies: []
    });
  };

  const removeOutcome = (type: 'spinWheel' | 'scratchCard', index: number) => {
    const currentOutcomes = data.rewards[type] || [];
    const newOutcomes = currentOutcomes.filter((_, i) => i !== index);
    updateRewards(type, newOutcomes);
  };

  const addQuestion = () => {
    if (!newQuestion.question.trim()) return;
    
    const currentQuestions = data.rewards.quiz || [];
    const newQuestions = [...currentQuestions, { ...newQuestion }];
    updateRewards('quiz', newQuestions);
    setNewQuestion({
      question: "",
      choices: ["", "", "", ""],
      correctAnswer: 0,
      points: 0
    });
  };

  const removeQuestion = (index: number) => {
    const currentQuestions = data.rewards.quiz || [];
    const newQuestions = currentQuestions.filter((_, i) => i !== index);
    updateRewards('quiz', newQuestions);
  };

  const renderSpinWheelConfig = () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Possible Outcomes</h3>
      
      {/* Existing outcomes */}
      {(data.rewards.spinWheel || []).map((outcome, index) => (
        <div key={index} className="p-3 bg-accent rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <GlobalRewardFields
              outcome={outcome}
              onUpdate={(updatedOutcome) => {
                const outcomes = [...(data.rewards.spinWheel || [])];
                outcomes[index] = updatedOutcome;
                updateRewards('spinWheel', outcomes);
              }}
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeOutcome('spinWheel', index)}
              className="shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      {/* Add new outcome */}
      <div className="p-3 border border-dashed border-border rounded-lg">
        <div className="space-y-3">
          <GlobalRewardFields
            outcome={newOutcome}
            onUpdate={(outcome) => setNewOutcome({
              ...outcome,
              productName: outcome.productName || "",
              discountPercentage: outcome.discountPercentage || 0,
              offerDescription: outcome.offerDescription || "",
              applicableCompanies: outcome.applicableCompanies || []
            })}
          />
          <Button onClick={() => addOutcome('spinWheel')} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Outcome
          </Button>
        </div>
      </div>
    </div>
  );

  const renderScratchCardConfig = () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Possible Outcomes</h3>
      
      {/* Existing outcomes */}
      {(data.rewards.scratchCard || []).map((outcome, index) => (
        <div key={index} className="p-3 bg-accent rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <GlobalRewardFields
              outcome={outcome}
              onUpdate={(updatedOutcome) => {
                const outcomes = [...(data.rewards.scratchCard || [])];
                outcomes[index] = updatedOutcome;
                updateRewards('scratchCard', outcomes);
              }}
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeOutcome('scratchCard', index)}
              className="shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      {/* Add new outcome */}
      <div className="p-3 border border-dashed border-border rounded-lg">
        <div className="space-y-3">
          <GlobalRewardFields
            outcome={newOutcome}
            onUpdate={(outcome) => setNewOutcome({
              ...outcome,
              productName: outcome.productName || "",
              discountPercentage: outcome.discountPercentage || 0,
              offerDescription: outcome.offerDescription || "",
              applicableCompanies: outcome.applicableCompanies || []
            })}
          />
          <Button onClick={() => addOutcome('scratchCard')} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Outcome
          </Button>
        </div>
      </div>
    </div>
  );

  const renderQuizConfig = () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Quiz Questions</h3>
      
      {/* Existing questions */}
      {(data.rewards.quiz || []).map((question, index) => (
        <Card key={index} className="bg-accent">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium">Question {index + 1}</span>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeQuestion(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm">{question.question}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {question.choices.map((choice, choiceIndex) => (
                <div 
                  key={choiceIndex}
                  className={`p-2 rounded ${choiceIndex === question.correctAnswer ? 'bg-brand text-brand-foreground' : 'bg-muted'}`}
                >
                  {choice}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Points: {question.points}</p>
          </CardContent>
        </Card>
      ))}

      {/* Add new question */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <Textarea
            value={newQuestion.question}
            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
            placeholder="Enter your question"
            rows={2}
          />
          
          <div className="space-y-2">
            <Label className="text-xs">Answer Choices</Label>
            {newQuestion.choices.map((choice, index) => (
              <Input
                key={index}
                value={choice}
                onChange={(e) => {
                  const choices = [...newQuestion.choices];
                  choices[index] = e.target.value;
                  setNewQuestion({ ...newQuestion, choices });
                }}
                placeholder={`Choice ${index + 1}`}
                className="text-sm"
              />
            ))}
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <Label className="text-xs">Correct Answer</Label>
              <Select 
                value={newQuestion.correctAnswer.toString()} 
                onValueChange={(value) => setNewQuestion({ ...newQuestion, correctAnswer: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {newQuestion.choices.map((_, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      Choice {index + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Label className="text-xs">Points per Question</Label>
              <Input
                type="number"
                value={newQuestion.points}
                onChange={(e) => setNewQuestion({ ...newQuestion, points: parseInt(e.target.value) || 0 })}
                placeholder="Points"
              />
            </div>
          </div>

          <Button onClick={addQuestion} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderSlotMachineConfig = () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Slot Machine Settings</h3>
      
      <div className="space-y-3">
        <div>
          <Label className="text-sm">Points Reward</Label>
          <Input
            type="number"
            value={data.rewards.slotMachine?.points || 0}
            onChange={(e) => updateRewards('slotMachine', { 
              ...data.rewards.slotMachine, 
              points: parseInt(e.target.value) || 0 
            })}
            placeholder="How many points to win"
          />
        </div>
        
        <div>
          <Label className="text-sm">Jackpot Probability (%)</Label>
          <Input
            type="number"
            min="0"
            max="100"
            value={data.rewards.slotMachine?.jackpotProbability || 0}
            onChange={(e) => updateRewards('slotMachine', { 
              ...data.rewards.slotMachine, 
              jackpotProbability: parseInt(e.target.value) || 0 
            })}
            placeholder="Probability to win (0-100%)"
          />
        </div>
      </div>
    </div>
  );

  const renderShareToEarnConfig = () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Share to Earn Settings</h3>
      
      <div className="space-y-3">
        <div>
          <Label className="text-sm">Points per Share</Label>
          <Input
            type="number"
            value={data.rewards.shareToEarn?.points || 0}
            onChange={(e) => updateRewards('shareToEarn', { 
              ...data.rewards.shareToEarn, 
              points: parseInt(e.target.value) || 0 
            })}
            placeholder="How many points participants earn per share"
          />
        </div>
        
        <div>
          <Label className="text-sm">Share Link/Content</Label>
          <Textarea
            value={data.rewards.shareToEarn?.shareLink || ""}
            onChange={(e) => updateRewards('shareToEarn', { 
              ...data.rewards.shareToEarn, 
              shareLink: e.target.value 
            })}
            placeholder="Enter the link or content that participants will share"
            rows={3}
          />
          <p className="text-xs text-muted-foreground mt-1">
            This can be a website URL, social media post content, or promotional text
          </p>
        </div>
      </div>
    </div>
  );

  if (!data.type) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">
            Please select a challenge type in the previous step to configure rewards.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-brand">Rewards Configuration</CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure rewards for your {data.type} challenge
          </p>
        </CardHeader>
        <CardContent>
          {data.type === "Spin the Wheel" && renderSpinWheelConfig()}
          {data.type === "Scratch Card" && renderScratchCardConfig()}
          {data.type === "Quiz Challenge" && renderQuizConfig()}
          {data.type === "Slot Machine" && renderSlotMachineConfig()}
          {data.type === "Share to Earn" && renderShareToEarnConfig()}
        </CardContent>
      </Card>
    </div>
  );
};
