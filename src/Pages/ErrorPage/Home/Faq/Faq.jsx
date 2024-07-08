import React from 'react';
import SectionTitle from '../../../../Shared/SectionTitle/SectionTitle';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import faqImg from '../../../../assets/images/faq2.jpg'
const Faq = () => {
    return (
        <div>
            <SectionTitle title={'FAQ'}></SectionTitle>
            <div className='flex md:flex-row flex-col-reverse justify-between items-center'>
                <Accordion type="single" collapsible className="md:w-1/2">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the benefit of using your site?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.                        Yes. It adheres to the WAI-ARIA design pattern.
                            Yes. It adheres to the WAI-ARIA design pattern.
                            Yes. It adheres to the WAI-ARIA design pattern.

                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How to create a survey?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It comes with default styles that matches the other
                            components&apos; aesthetic.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What kind of surveys can i create here?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It's animated by default, but you can disable it if you prefer.                        Yes. It's animated by default, but you can disable it if you prefer.
                            Yes. It's animated by default, but you can disable it if you prefer.
                            Yes. It's animated by default, but you can disable it if you prefer.

                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <img className='md:w-1/2' src={faqImg} alt="" />
            </div>
        </div>
    );
};

export default Faq;

