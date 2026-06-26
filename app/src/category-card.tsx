import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  itemCount: number;
  activeShipments: number;
  category: "palm-oil" | "healthy-oil" | "beverages" | "agriculture" | "personal-care" | "aquaculture" | "livestock";
  index?: number;
}

const categoryStyles = {
  "palm-oil": "gradient-palm-oil",
  "healthy-oil": "gradient-healthy-oil",
  "beverages": "gradient-beverages",
  "agriculture": "gradient-agriculture",
  "personal-care": "gradient-personal-care",
  "aquaculture": "gradient-aquaculture",
  "livestock": "gradient-livestock",
};

export function CategoryCard({
  title,
  description,
  icon: Icon,
  itemCount,
  activeShipments,
  category,
  index = 0,
}: CategoryCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 animate-slide-up cursor-pointer"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-lg text-white",
                categoryStyles[category]
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">{title}</h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-2xl font-bold text-card-foreground">{itemCount}</p>
              <p className="text-xs text-muted-foreground">Produits</p>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse-live" />
                <p className="text-2xl font-bold text-card-foreground">{activeShipments}</p>
              </div>
              <p className="text-xs text-muted-foreground">En transit</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted overflow-hidden">
        <div 
          className={cn("h-full transition-all duration-500", categoryStyles[category])}
          style={{ width: `${(activeShipments / itemCount) * 100}%` }}
        />
      </div>
    </div>
  );
}
