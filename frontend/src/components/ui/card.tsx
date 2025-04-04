import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[5px] text-lightAccent dark:text-emeraldAccent bg-lightCard dark:bg-card border border-lightBorder dark:border-borderLine shadow-md ",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4  ", className)} {...props} />;
}
