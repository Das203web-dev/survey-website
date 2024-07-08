import SectionTitle from "@/Shared/SectionTitle/SectionTitle";
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";

const Frequent = () => {
    return (
        <div>
            <div className="space-y-5  text-start">
                <SectionTitle title={'Frequently Asked Questions'}></SectionTitle>
            </div>
            <Accordion type="single" collapsible className="w-full mx-auto">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl font-light">How do I participate in a survey?</AccordionTrigger>
                    <AccordionContent className="ml-8 text-slate-500">
                        Simply click on the survey details and follow the instructions to participate.                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl font-light">Is it styled?</AccordionTrigger>
                    <AccordionContent className="ml-8 text-slate-500">
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl font-light">Is it animated?</AccordionTrigger>
                    <AccordionContent className="ml-8 text-slate-500">
                        Yes. It&apos;s animated by default, but you can disable it if you
                        prefer.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    );
};

export default Frequent;