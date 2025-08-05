import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import type { ChallengeData } from "@/pages/CreateChallenge";

interface RewardsConfigurationProps {
  data: ChallengeData;
  onUpdate: (updates: Partial<ChallengeData>) => void;
}

export const RewardsConfiguration = ({ data, onUpdate }: RewardsConfigurationProps) => {
  const [newOutcome, setNewOutcome] = useState({ type: 'points' as 'points' | 'text', value: "" });
  const [newProduct, setNewProduct] = useState({ name: "", points: 0, label: "" });
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
      type: newOutcome.type, 
      value: newOutcome.value, 
      probability: 10 
    }];
    updateRewards(type, newOutcomes);
    setNewOutcome({ type: 'points', value: "" });
  };

  const removeOutcome = (type: 'spinWheel' | 'scratchCard', index: number) => {
    const currentOutcomes = data.rewards[type] || [];
    const newOutcomes = currentOutcomes.filter((_, i) => i !== index);
    updateRewards(type, newOutcomes);
  };

  const addProduct = () => {
    if (!newProduct.name.trim() || !newProduct.label.trim()) return;
    
    const currentProducts = data.rewards.buyProducts || [];
    const newProducts = [...currentProducts, { 
      productName: newProduct.name, 
      points: newProduct.points,
      label: newProduct.label
    }];
    updateRewards('buyProducts', newProducts);
    setNewProduct({ name: "", points: 0, label: "" });
  };

  const removeProduct = (index: number) => {
    const currentProducts = data.rewards.buyProducts || [];
    const newProducts = currentProducts.filter((_, i) => i !== index);
    updateRewards('buyProducts', newProducts);
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
        <div key={index} className="flex items-center gap-2 p-3 bg-accent rounded-lg">
          <Select
            value={outcome.type}
            onValueChange={(value: 'points' | 'text') => {
              const outcomes = [...(data.rewards.spinWheel || [])];
              outcomes[index].type = value;
              updateRewards('spinWheel', outcomes);
            }}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="points">Points</SelectItem>
              <SelectItem value="text">Text</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={outcome.value}
            onChange={(e) => {
              const outcomes = [...(data.rewards.spinWheel || [])];
              outcomes[index].value = e.target.value;
              updateRewards('spinWheel', outcomes);
            }}
            placeholder={outcome.type === 'points' ? "100" : "Better luck next time"}
            className="flex-1"
          />
          <Button
            variant="destructive"
            size="icon"
            onClick={() => removeOutcome('spinWheel', index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {/* Add new outcome */}
      <div className="flex gap-2">
        <Select
          value={newOutcome.type}
          onValueChange={(value: 'points' | 'text') => setNewOutcome({ ...newOutcome, type: value })}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="points">Points</SelectItem>
            <SelectItem value="text">Text</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={newOutcome.value}
          onChange={(e) => setNewOutcome({ ...newOutcome, value: e.target.value })}
          placeholder={newOutcome.type === 'points' ? "100" : "Better luck next time"}
          className="flex-1"
        />
        <Button onClick={() => addOutcome('spinWheel')} variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderScratchCardConfig = () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Possible Outcomes</h3>
      
      {/* Existing outcomes */}
      {(data.rewards.scratchCard || []).map((outcome, index) => (
        <div key={index} className="flex items-center gap-2 p-3 bg-accent rounded-lg">
          <Select
            value={outcome.type}
            onValueChange={(value: 'points' | 'text') => {
              const outcomes = [...(data.rewards.scratchCard || [])];
              outcomes[index].type = value;
              updateRewards('scratchCard', outcomes);
            }}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="points">Points</SelectItem>
              <SelectItem value="text">Text</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={outcome.value}
            onChange={(e) => {
              const outcomes = [...(data.rewards.scratchCard || [])];
              outcomes[index].value = e.target.value;
              updateRewards('scratchCard', outcomes);
            }}
            placeholder={outcome.type === 'points' ? "100" : "Try again"}
            className="flex-1"
          />
          <Button
            variant="destructive"
            size="icon"
            onClick={() => removeOutcome('scratchCard', index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {/* Add new outcome */}
      <div className="flex gap-2">
        <Select
          value={newOutcome.type}
          onValueChange={(value: 'points' | 'text') => setNewOutcome({ ...newOutcome, type: value })}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="points">Points</SelectItem>
            <SelectItem value="text">Text</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={newOutcome.value}
          onChange={(e) => setNewOutcome({ ...newOutcome, value: e.target.value })}
          placeholder={newOutcome.type === 'points' ? "100" : "Try again"}
          className="flex-1"
        />
        <Button onClick={() => addOutcome('scratchCard')} variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderBuyProductsConfig = () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Products to Buy</h3>
      
      {/* Existing products */}
      {(data.rewards.buyProducts || []).map((product, index) => (
        <div key={index} className="space-y-2 p-3 bg-accent rounded-lg">
          <div className="flex items-center gap-2">
            <Input
              value={product.productName}
              onChange={(e) => {
                const products = [...(data.rewards.buyProducts || [])];
                products[index].productName = e.target.value;
                updateRewards('buyProducts', products);
              }}
              placeholder="Product name"
              className="flex-1"
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeProduct(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={product.label}
              onChange={(e) => {
                const products = [...(data.rewards.buyProducts || [])];
                products[index].label = e.target.value;
                updateRewards('buyProducts', products);
              }}
              placeholder="Label (e.g., Coffee Cup)"
              className="text-sm"
            />
            <Input
              type="number"
              value={product.points}
              onChange={(e) => {
                const products = [...(data.rewards.buyProducts || [])];
                products[index].points = parseInt(e.target.value) || 0;
                updateRewards('buyProducts', products);
              }}
              placeholder="Points"
              className="text-sm"
            />
          </div>
        </div>
      ))}

      {/* Add new product */}
      <div className="space-y-2">
        <Input
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          placeholder="Product name"
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            value={newProduct.label}
            onChange={(e) => setNewProduct({ ...newProduct, label: e.target.value })}
            placeholder="Label (e.g., Coffee Cup)"
          />
          <Input
            type="number"
            value={newProduct.points}
            onChange={(e) => setNewProduct({ ...newProduct, points: parseInt(e.target.value) || 0 })}
            placeholder="Points reward"
          />
        </div>
        <Button onClick={addProduct} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
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
          {data.type === "Buy Products" && renderBuyProductsConfig()}
          {data.type === "Quiz Challenge" && renderQuizConfig()}
          {data.type === "Slot Machine" && renderSlotMachineConfig()}
          {data.type === "Share to Earn" && renderShareToEarnConfig()}
        </CardContent>
      </Card>
    </div>
  );
};
