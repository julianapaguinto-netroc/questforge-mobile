import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ChallengeData } from "@/pages/CreateChallenge";

interface MechanicsSettingsProps {
  data: ChallengeData;
  onUpdate: (updates: Partial<ChallengeData>) => void;
}

export const MechanicsSettings = ({ data, onUpdate }: MechanicsSettingsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-brand">Mechanics & Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="instructions" className="text-sm font-medium">
              Challenge Instructions
            </Label>
            <Textarea
              id="instructions"
              placeholder="Explain how participants can complete this challenge..."
              rows={4}
              value={data.instructions}
              onChange={(e) => onUpdate({ instructions: e.target.value })}
              className="border-border focus:ring-brand focus:border-brand resize-none"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Participation Limits</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxPerDay" className="text-sm">
                  Max attempts per day
                </Label>
                <Input
                  id="maxPerDay"
                  type="number"
                  placeholder="Unlimited"
                  value={data.maxAttemptsPerDay || ""}
                  onChange={(e) => onUpdate({ 
                    maxAttemptsPerDay: e.target.value ? parseInt(e.target.value) : null 
                  })}
                  className="border-border focus:ring-brand focus:border-brand"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalAttempts" className="text-sm">
                  Total attempts allowed
                </Label>
                <Input
                  id="totalAttempts"
                  type="number"
                  placeholder="Unlimited"
                  value={data.totalAttempts || ""}
                  onChange={(e) => onUpdate({ 
                    totalAttempts: e.target.value ? parseInt(e.target.value) : null 
                  })}
                  className="border-border focus:ring-brand focus:border-brand"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Visibility</Label>
            <RadioGroup
              value={data.visibility}
              onValueChange={(value: "public" | "private") => onUpdate({ visibility: value })}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public" className="text-sm font-normal">
                  Public - Anyone can see and participate
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private" className="text-sm font-normal">
                  Private - Only invited users can participate
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};