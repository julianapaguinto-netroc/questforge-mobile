import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, QrCode, Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import QRCode from "qrcode";
import type { ChallengeData } from "@/pages/CreateChallenge";

interface MechanicsSettingsProps {
  data: ChallengeData;
  onUpdate: (updates: Partial<ChallengeData>) => void;
}

export const MechanicsSettings = ({ data, onUpdate }: MechanicsSettingsProps) => {
  const [newParticipant, setNewParticipant] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  const generateChallengeLink = () => {
    const baseUrl = window.location.origin;
    const challengeId = Math.random().toString(36).substring(2, 15);
    const link = `${baseUrl}/challenge/${challengeId}`;
    
    onUpdate({
      inviteOnly: {
        ...data.inviteOnly,
        challengeLink: link
      }
    });
    
    return link;
  };

  const copyLinkToClipboard = () => {
    const link = data.inviteOnly?.challengeLink || generateChallengeLink();
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied!",
      description: "Challenge invite link copied to clipboard",
    });
  };

  const generateQRCode = async () => {
    try {
      const link = data.inviteOnly?.challengeLink || generateChallengeLink();
      const qrCodeUrl = await QRCode.toDataURL(link);
      setQrCodeDataUrl(qrCodeUrl);
      
      // Create download link
      const downloadLink = document.createElement('a');
      downloadLink.href = qrCodeUrl;
      downloadLink.download = 'challenge-qr-code.png';
      downloadLink.click();
      
      toast({
        title: "QR Code generated!",
        description: "QR code has been downloaded",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    }
  };

  const addParticipant = () => {
    if (!newParticipant.trim()) return;
    
    const currentParticipants = data.inviteOnly?.participants || [];
    onUpdate({
      inviteOnly: {
        ...data.inviteOnly,
        challengeLink: data.inviteOnly?.challengeLink || "",
        participants: [...currentParticipants, newParticipant.trim()]
      }
    });
    setNewParticipant("");
  };

  const removeParticipant = (index: number) => {
    const currentParticipants = data.inviteOnly?.participants || [];
    onUpdate({
      inviteOnly: {
        ...data.inviteOnly,
        challengeLink: data.inviteOnly?.challengeLink || "",
        participants: currentParticipants.filter((_, i) => i !== index)
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-brand">Game Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="instructions" className="text-sm font-medium">
              Game Instructions
            </Label>
            <Textarea
              id="instructions"
              placeholder="Explain how participants can complete this game..."
              rows={4}
              value={data.instructions}
              onChange={(e) => onUpdate({ instructions: e.target.value })}
              className="border-border focus:ring-brand focus:border-brand resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-accent rounded-lg">
              <p className="text-sm text-muted-foreground">
                🎮 <strong>One-time Play:</strong> Each participant can only play this game once for fairness and engagement.
              </p>
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

            {/* Private visibility options */}
            {data.visibility === "private" && (
              <div className="mt-4 space-y-4 p-4 bg-accent rounded-lg">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Invite Participants</Label>
                  
                  {/* Participants list */}
                  {data.inviteOnly?.participants && data.inviteOnly.participants.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {data.inviteOnly.participants.map((participant, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {participant}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 ml-1"
                              onClick={() => removeParticipant(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add participant */}
                  <div className="flex gap-2">
                    <Input
                      value={newParticipant}
                      onChange={(e) => setNewParticipant(e.target.value)}
                      placeholder="Enter email or username"
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                    />
                    <Button onClick={addParticipant} variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Share options */}
                <div className="space-y-3 pt-3 border-t border-border">
                  <Label className="text-sm font-medium">Share Game</Label>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={copyLinkToClipboard}
                      variant="outline"
                      className="flex-1"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </Button>
                    <Button
                      onClick={generateQRCode}
                      variant="outline"
                      className="flex-1"
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      QR Code
                    </Button>
                  </div>
                  
                  {data.inviteOnly?.challengeLink && (
                    <div className="text-xs text-muted-foreground bg-muted p-2 rounded break-all">
                      {data.inviteOnly.challengeLink}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};