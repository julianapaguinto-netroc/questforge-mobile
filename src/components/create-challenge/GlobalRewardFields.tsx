import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

interface RewardOutcome {
  type: 'points' | 'text' | 'offers' | 'discount';
  value: string;
  probability: number;
  productName?: string;
  discountPercentage?: number;
  offerDescription?: string;
  applicableCompanies?: string[];
}

interface GlobalRewardFieldsProps {
  outcome: RewardOutcome;
  onUpdate: (outcome: RewardOutcome) => void;
  companies?: string[];
}

const DEFAULT_COMPANIES = [
  "Puma", "Nike", "Nestle Store", "Uniqlo"
];

export const GlobalRewardFields = ({ outcome, onUpdate, companies = DEFAULT_COMPANIES }: GlobalRewardFieldsProps) => {
  const [newCompany, setNewCompany] = useState("");

  const addCompany = (company: string) => {
    const currentCompanies = outcome.applicableCompanies || [];
    if (!currentCompanies.includes(company)) {
      onUpdate({
        ...outcome,
        applicableCompanies: [...currentCompanies, company]
      });
    }
  };

  const removeCompany = (company: string) => {
    const currentCompanies = outcome.applicableCompanies || [];
    onUpdate({
      ...outcome,
      applicableCompanies: currentCompanies.filter(c => c !== company)
    });
  };

  return (
    <div className="space-y-3">
      {/* Reward Type Selection */}
      <div className="space-y-2">
        <Label className="text-xs">Reward Type</Label>
        <Select
          value={outcome.type}
          onValueChange={(value: 'points' | 'text' | 'offers' | 'discount') => 
            onUpdate({ ...outcome, type: value })
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="points">Points</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="offers">Offers</SelectItem>
            <SelectItem value="discount">Discount</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Value Field */}
      <div className="space-y-2">
        <Label className="text-xs">
          {outcome.type === 'points' ? 'Points Amount' : 'Message'}
        </Label>
        <Input
          value={outcome.value}
          onChange={(e) => onUpdate({ ...outcome, value: e.target.value })}
          placeholder={
            outcome.type === 'points' ? "100" : 
            outcome.type === 'text' ? "Better luck next time" :
            outcome.type === 'offers' ? "Special offer code" :
            "Discount code"
          }
        />
      </div>

      {/* Discount Fields */}
      {outcome.type === 'discount' && (
        <>
          <div className="space-y-2">
            <Label className="text-xs">Product Name</Label>
            <Input
              value={outcome.productName || ""}
              onChange={(e) => onUpdate({ ...outcome, productName: e.target.value })}
              placeholder="Enter product name"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Voucher Discount Percentage</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={outcome.discountPercentage || ""}
              onChange={(e) => onUpdate({ ...outcome, discountPercentage: parseInt(e.target.value) || 0 })}
              placeholder="10"
            />
          </div>
        </>
      )}

      {/* Offer Fields */}
      {outcome.type === 'offers' && (
        <div className="space-y-2">
          <Label className="text-xs">Offer Description</Label>
          <Textarea
            value={outcome.offerDescription || ""}
            onChange={(e) => onUpdate({ ...outcome, offerDescription: e.target.value })}
            placeholder="e.g., Buy 2 Get 1 Free"
            rows={2}
          />
        </div>
      )}

      {/* Company Selection for Discounts and Offers */}
      {(outcome.type === 'discount' || outcome.type === 'offers') && (
        <div className="space-y-2">
          <Label className="text-xs">Applicable Companies</Label>
          
          {/* Selected Companies */}
          {outcome.applicableCompanies && outcome.applicableCompanies.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {outcome.applicableCompanies.map((company) => (
                <Badge key={company} variant="secondary" className="text-xs">
                  {company}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-3 w-3 ml-1"
                    onClick={() => removeCompany(company)}
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          {/* Company Selection */}
          <Select
            value=""
            onValueChange={(value) => addCompany(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select companies" />
            </SelectTrigger>
            <SelectContent>
              {companies
                .filter(company => !outcome.applicableCompanies?.includes(company))
                .map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};