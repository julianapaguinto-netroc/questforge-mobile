import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, Image } from "lucide-react";
import type { ChallengeData } from "@/pages/CreateChallenge";

interface ChallengeBasicsProps {
  data: ChallengeData;
  onUpdate: (updates: Partial<ChallengeData>) => void;
}

export const ChallengeBasics = ({ data, onUpdate }: ChallengeBasicsProps) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onUpdate({ bannerImage: file });
  };

  const challengeTypes = [
    "Spin the Wheel",
    "Scratch Card", 
    "Share to Earn",
    "Quiz Challenge",
    "Slot Machine"
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-brand">Challenge Basics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="challengeName" className="text-sm font-medium">
              Challenge Name *
            </Label>
            <Input
              id="challengeName"
              placeholder="Enter challenge name"
              value={data.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className="border-border focus:ring-brand focus:border-brand"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Challenge Type *</Label>
            <Select value={data.type} onValueChange={(value) => onUpdate({ type: value })}>
              <SelectTrigger className="border-border focus:ring-brand focus:border-brand">
                <SelectValue placeholder="Select challenge type" />
              </SelectTrigger>
              <SelectContent>
                {challengeTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your challenge..."
              rows={3}
              value={data.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              className="border-border focus:ring-brand focus:border-brand resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Banner Image</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6">
              {data.bannerImage ? (
                <div className="text-center">
                  <Image className="mx-auto h-12 w-12 text-brand mb-2" />
                  <p className="text-sm text-foreground font-medium">
                    {data.bannerImage.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(data.bannerImage.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => onUpdate({ bannerImage: null })}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload banner image
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <label className="cursor-pointer">
                      Choose File
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};