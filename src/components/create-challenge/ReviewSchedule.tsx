import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Users, Clock, Target, Image } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { ChallengeData } from "@/pages/CreateChallenge";

interface ReviewScheduleProps {
  data: ChallengeData;
  onUpdate: (updates: Partial<ChallengeData>) => void;
}

export const ReviewSchedule = ({ data, onUpdate }: ReviewScheduleProps) => {
  const formatDate = (date: Date | null) => {
    return date ? format(date, "PPP") : "Select date";
  };

  return (
    <div className="space-y-6">
      {/* Challenge Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand">Challenge Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-brand" />
                <span className="text-sm font-medium">Challenge Info</span>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Name:</strong> {data.name || "Untitled Challenge"}</p>
                <p><strong>Type:</strong> {data.type || "Not selected"}</p>
                <p><strong>Visibility:</strong> {data.visibility === "public" ? "Public" : "Private"}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-brand" />
                <span className="text-sm font-medium">Participation</span>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Play limit:</strong> One-time only</p>
              </div>
            </div>
          </div>

          {data.bannerImage && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4 text-brand" />
                <span className="text-sm font-medium">Banner Image</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {data.bannerImage.name} ({(data.bannerImage.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          )}

          {data.description && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground">{data.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule & Launch */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand">Schedule & Launch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* When to publish */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">1. When to publish challenge?</Label>
            <RadioGroup
              value={data.publishNow ? "now" : "later"}
              onValueChange={(value) => onUpdate({ publishNow: value === "now" })}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="now" id="publishNow" />
                <Label htmlFor="publishNow" className="text-sm font-normal">
                  🔘 Publish Now
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="later" id="publishLater" />
                <Label htmlFor="publishLater" className="text-sm font-normal">
                  🔘 Schedule for later
                </Label>
              </div>
            </RadioGroup>

            {!data.publishNow && (
              <div className="ml-6 space-y-2">
                <Label className="text-sm">Publish Date & Time</Label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "flex-1 justify-start text-left font-normal",
                          !data.publishDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formatDate(data.publishDate)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={data.publishDate || undefined}
                        onSelect={(date) => onUpdate({ publishDate: date || null })}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="time"
                    className="w-32"
                    defaultValue="09:00"
                  />
                </div>
              </div>
            )}
          </div>

          {/* When to start */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">2. When does the challenge start?</Label>
            <RadioGroup
              value={data.startOnPublish ? "onPublish" : "specific"}
              onValueChange={(value) => onUpdate({ startOnPublish: value === "onPublish" })}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="onPublish" id="startOnPublish" />
                <Label htmlFor="startOnPublish" className="text-sm font-normal">
                  🔘 Start on publish
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="specific" id="startSpecific" />
                <Label htmlFor="startSpecific" className="text-sm font-normal">
                  🔘 Start on specific date
                </Label>
              </div>
            </RadioGroup>

            {!data.startOnPublish && (
              <div className="ml-6 space-y-2">
                <Label className="text-sm">Start Date & Time</Label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "flex-1 justify-start text-left font-normal",
                          !data.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formatDate(data.startDate)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={data.startDate || undefined}
                        onSelect={(date) => onUpdate({ startDate: date || null })}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="time"
                    className="w-32"
                    defaultValue="09:00"
                  />
                </div>
              </div>
            )}
          </div>

          {/* When to end */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">3. When does the challenge end? *</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-1 justify-start text-left font-normal",
                        !data.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formatDate(data.endDate)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={data.endDate || undefined}
                      onSelect={(date) => onUpdate({ endDate: date || null })}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  className="w-32"
                  defaultValue="23:59"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                End date must be after the start date
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};