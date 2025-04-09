import { Separator } from "@/components/ui/separator";

export function Title({ title, caption }) {
  return (
    <div>
      <h3 className="text-3xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{caption}</p>
      <Separator className="mt-5 mb-3"/>
    </div>
  );
}
