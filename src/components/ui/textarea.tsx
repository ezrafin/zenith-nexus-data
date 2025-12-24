import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  success?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, success, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            error && "border-destructive focus-visible:ring-destructive",
            success && "border-success focus-visible:ring-success",
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <div className="absolute right-3 top-3">
            <div className="h-4 w-4 rounded-full bg-destructive/20 flex items-center justify-center">
              <span className="text-destructive text-xs">!</span>
            </div>
          </div>
        )}
        {success && (
          <div className="absolute right-3 top-3">
            <div className="h-4 w-4 rounded-full bg-success/20 flex items-center justify-center">
              <span className="text-success text-xs">✓</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
