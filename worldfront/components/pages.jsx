'use client'

import {Section} from '@/components/boxWrap';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const HomePage = () => {
    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            {/* Image de fond - Carte du monde */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/carte-monde-couleur.jpg"
                    alt="Carte du monde"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay pour améliorer la lisibilité du texte */}
                <div className="absolute inset-0 bg-black/10"/>
            </div>

            {/* Contenu */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center min-h-screen">
                <div className="max-w-3xl space-y-8">
                    {/* Titre principal */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                        Découvrez comment vos données sont protégées à travers le monde
                    </h1>

                    {/* Bouton CTA */}
                    <div>
                        <Button
                            asChild
                            size="lg"
                            className="bg-purple-900 hover:bg-purple-800 text-white px-12 py-6 text-xl rounded-md shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <Link href="/carte">
                                Explorez la carte
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}


const Carte = () => {
    return (
        <Section className="relative min-h-screen flex flex-col items-center justify-center px-6">
            <div className="text-red">
                <h1>Loading...</h1>
            </div>
        </Section>
    )
}

const Quizz = () => {
    return (
        <Section className="relative min-h-screen flex flex-col items-center justify-center px-6">
            <div className="text-red">
                <h1>Loading...</h1>
            </div>
        </Section>
    )
}

const FAQ = () => {
    const timelineItems = [
        {
            title: "Lorem Ipsum",
            content: "sodales. dui massa convallis, facilisis laoreet elit, at Praesent lorem. ex et vel nisl. Nunc faucibus nec efficitur. dolor est. venenatis nulla, eget libero.",
            paragraphs: [
                "nulla, elit. Nunc Sed viverra Donec vitae est. quam eget ullamcorper adipiscing fringilla ultrices ex Lorem turpis massa consectetur Lorem hendrerit venenatis.",
                "non ipsum amet., vitae dignissim, facilisis ultrices viverra faucibus eget"
            ],
            side: "left"
        },
        {
            title: "Lorem Ipsum",
            content: "sodales. dui massa convallis, facilisis laoreet elit, at Praesent lorem. ex et vel nisl. Nunc faucibus nec efficitur. dolor est. venenatis nulla, eget libero.",
            paragraphs: [
                "nulla, elit. Nunc Sed viverra Donec vitae est. quam eget ullamcorper adipiscing fringilla ultrices ex Lorem turpis massa consectetur Lorem hendrerit venenatis.",
                "non ipsum amet., vitae dignissim, facilisis ultrices viverra faucibus eget"
            ],
            side: "right"
        },
        {
            title: "Lorem Ipsum",
            content: "sodales. dui massa convallis, facilisis laoreet elit, at Praesent lorem. ex et vel nisl. Nunc faucibus nec efficitur. dolor est. venenatis nulla, eget libero.",
            paragraphs: [
                "nulla, elit. Nunc Sed viverra Donec vitae est. quam eget ullamcorper adipiscing fringilla ultrices ex Lorem turpis massa consectetur Lorem hendrerit venenatis.",
                "non ipsum amet., vitae dignissim, facilisis ultrices viverra faucibus eget"
            ],
            side: "left"
        },
        {
            title: "Lorem Ipsum",
            content: "sodales. dui massa convallis, facilisis laoreet elit, at Praesent lorem. ex et vel nisl. Nunc faucibus nec efficitur. dolor est. venenatis nulla, eget libero.",
            paragraphs: [
                "nulla, elit. Nunc Sed viverra Donec vitae est. quam eget ullamcorper adipiscing fringilla ultrices ex Lorem turpis massa consectetur Lorem hendrerit venenatis.",
                "non ipsum amet., vitae dignissim, facilisis ultrices viverra faucibus eget"
            ],
            side: "right"
        },
        {
            title: "Lorem Ipsum",
            content: "sodales. dui massa convallis, facilisis laoreet elit, at Praesent lorem. ex et vel nisl. Nunc faucibus nec efficitur. dolor est. venenatis nulla, eget libero.",
            paragraphs: [
                "nulla, elit. Nunc Sed viverra Donec vitae est. quam eget ullamcorper adipiscing fringilla ultrices ex Lorem turpis massa consectetur Lorem hendrerit venenatis.",
                "non ipsum amet., vitae dignissim, facilisis ultrices viverra faucibus eget"
            ],
            side: "left"
        },
        {
            title: "Lorem Ipsum",
            content: "sodales. dui massa convallis, facilisis laoreet elit, at Praesent lorem. ex et vel nisl. Nunc faucibus nec efficitur. dolor est. venenatis nulla, eget libero.",
            paragraphs: [
                "nulla, elit. Nunc Sed viverra Donec vitae est. quam eget ullamcorper adipiscing fringilla ultrices ex Lorem turpis massa consectetur Lorem hendrerit venenatis.",
                "non ipsum amet., vitae dignissim, facilisis ultrices viverra faucibus eget"
            ],
            side: "right"
        }
        ]

    const faqItems = [
        {
            question: "sodales. dui massa convallis ?",
            answer: "nulla, elit. Nunc Sed viverra Donec vitae est. quam eget ullamcorper adipiscing fringilla ultrices ex Lorem turpis massa consectetur Lorem hendrerit venenatis on ipsum amet, vitae dignissim, facilisis ultrices viverra faucibus eget"
        },
        {
            question: "sodales. dui massa convallis ?",
            answer: "nulla, elit. Nunc Sed viverra Donec vitae est. quam eget ullamcorper adipiscing fringilla ultrices ex Lorem turpis massa consectetur Lorem hendrerit venenatis on ipsum amet, vitae dignissim, facilisis ultrices viverra faucibus eget"
        },
        {
            question: "sodales. dui massa convallis ?",
            answer: "nulla, elit. Nunc Sed viverra Donec vitae est. quam eget ullamcorper adipiscing fringilla ultrices ex Lorem turpis massa consectetur Lorem hendrerit venenatis on ipsum amet, vitae dignissim, facilisis ultrices viverra faucibus eget"
        },
        {
            question: "sodales. dui massa convallis ?",
            answer: "nulla, elit. Nunc Sed viverra Donec vitae est. quam eget ullamcorper adipiscing fringilla ultrices ex Lorem turpis massa consectetur Lorem hendrerit venenatis on ipsum amet, vitae dignissim, facilisis ultrices viverra faucibus eget"
        },
        {
            question: "sodales. dui massa convallis ?",
            answer: "nulla, elit. Nunc Sed viverra Donec vitae est. quam eget ullamcorper adipiscing fringilla ultrices ex Lorem turpis massa consectetur Lorem hendrerit venenatis on ipsum amet, vitae dignissim, facilisis ultrices viverra faucibus eget"
        },
        {
            question: "sodales. dui massa convallis ?",
            answer: "nulla, elit. Nunc Sed viverra Donec vitae est. quam eget ullamcorper adipiscing fringilla ultrices ex Lorem turpis massa consectetur Lorem hendrerit venenatis on ipsum amet, vitae dignissim, facilisis ultrices viverra faucibus eget"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Section Timeline */}
            <section className="container mx-auto px-4 py-16">
                <div className="relative">
                    {/* Ligne centrale */}
                    <div
                        className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-500 via-purple-400 to-orange-500 opacity-30"/>

                    <div className="space-y-12">
                        {timelineItems.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row gap-8 items-center ${
                                    item.side === "right" ? "md:flex-row-reverse" : ""
                                }`}
                            >
                                {/* Carte */}
                                <div className={`w-full md:w-5/12 ${
                                    item.side === "left"
                                        ? "bg-white border-4 border-orange-500 text-foreground"
                                        : "bg-purple-200 text-foreground"
                                } rounded-3xl p-8 shadow-lg`}>
                                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                    <p className="mb-4 text-sm leading-relaxed">{item.content}</p>
                                    {item.paragraphs.map((para, i) => (
                                        <p key={i} className="mb-4 text-sm leading-relaxed">
                                            {para}
                                        </p>
                                    ))}
                                </div>

                                {/* Point central */}
                                <div className="hidden md:flex w-2/12 justify-center">
                                    <div
                                        className="w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg"/>
                                </div>

                                {/* Espace vide de l'autre côté */}
                                <div className="hidden md:block w-5/12"/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section FAQ Accordion */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">
                    Questions souvent posées
                </h2>

                <Accordion type="single" collapsible className="space-y-4">
                    {faqItems.map((item, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border-2 border-border rounded-2xl px-6 overflow-hidden"
                        >
                            <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground pb-6">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    )
}

export {HomePage, Carte, Quizz, FAQ}