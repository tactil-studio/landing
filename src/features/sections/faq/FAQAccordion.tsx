import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/shared/ui/react/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  startIndex?: number;
}

export default function FAQAccordion({ items, startIndex = 0 }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {items.map((item, index) => (
        <AccordionItem
          // biome-ignore lint/suspicious/noArrayIndexKey: No pasa nada 
          key={index}
          value={`item-${startIndex + index}`}
          className="rounded-xl bg-background border border-foreground/10 px-6 hover:border-primary/50 transition-colors"
        >
          <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

