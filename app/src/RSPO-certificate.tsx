import { Shield, CheckCircle, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RSPOCertificationBadgeProps {
  certified: boolean;
  certificationId?: string;
  expiryDate?: string;
  className?: string;
}

export function RSPOCertificationBadge({
  certified,
  certificationId,
  expiryDate,
  className,
}: RSPOCertificationBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 rounded-lg border",
        certified
          ? "bg-success/10 border-success/30 text-success"
          : "bg-muted border-border text-muted-foreground",
        className
      )}
    >
      {certified ? (
        <>
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <Leaf className="h-3 w-3" />
          </div>
          <div className="text-xs">
            <p className="font-semibold">RSPO Certifié</p>
            {certificationId && (
              <p className="text-success/70">#{certificationId}</p>
            )}
          </div>
          <CheckCircle className="h-4 w-4" />
        </>
      ) : (
        <>
          <Shield className="h-4 w-4" />
          <span className="text-xs font-medium">Non certifié</span>
        </>
      )}
    </div>
  );
}
