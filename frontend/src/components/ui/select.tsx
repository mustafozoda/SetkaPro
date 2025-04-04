import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Select = SelectPrimitive.Root;
export const SelectTrigger = ({ className, children, ...props }: any) => (
  <SelectPrimitive.Trigger
    className={cn(
      "flex items-center justify-between rounded-md border px-3 py-2 text-sm shadow-sm",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </SelectPrimitive.Trigger>
);

export const SelectValue = SelectPrimitive.Value;

export const SelectContent = ({ children, className }: any) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn("rounded-md border bg-popover p-1 shadow-md", className)}
    >
      <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

export const SelectItem = ({ children, className, ...props }: any) => (
  <SelectPrimitive.Item
    className={cn("cursor-pointer px-3 py-2 text-sm", className)}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator>
      <Check className="h-4 w-4" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
);
