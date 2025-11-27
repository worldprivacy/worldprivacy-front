'use client'

import {Section} from '@/components/boxWrap';
import InteractiveWorldMap from "@/components/worldMap";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Scale, Gavel, FileText } from "lucide-react";
import Squeeze from "@/components/squeeze";

const HomePage = () => {

    const features = [
        {
            icon: Scale,
            title: "Législations",
            color: "text-orange-500"
        },
        {
            icon: Gavel,
            title: "Autorités nationales",
            color: "text-orange-500"
        },
        {
            icon: FileText,
            title: "Transferts internationaux",
            color: "text-orange-500"
        }
    ];

    return (
        <>
            {/* Section Hero avec image en absolute */}
            <section className="relative h-screen w-full overflow-hidden">
                {/* img Carte du monde en absolute */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/carte-monde-couleur.jpg"
                        alt="Carte du monde"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay pour que le texte soit + lisible */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"/>
                </div>

                {/* Contenu Hero */}
                <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center h-full">
                    <div className="max-w-3xl space-y-8">
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

            {/* Section Features - dans le flux normal en dessous */}
            <section className="bg-background py-16 md:py-24">
                <div className="container mx-auto px-4">
                    {/* Grille des icônes et titres */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center text-center space-y-4">
                                {/* Icône */}
                                <div className="w-24 h-24 flex items-center justify-center">
                                    <feature.icon className="w-20 h-20 text-primary stroke-[1.5]"/>
                                </div>
                                {/* Titre */}
                                <h3 className={`text-xl md:text-2xl font-semibold ${feature.color}`}>
                                    {feature.title}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {/* Textes descriptifs */}
                    <div className="max-w-4xl mx-auto space-y-6 text-foreground leading-relaxed">
                        <p>
                            Nunc placerat non nibh at fringilla at, elit viverra facilisis consectetur nisl.
                            tincidunt Lorem viverra sed diam elit efficitur. vitae porta Quisque placerat
                        </p>

                        <p>
                            at, venenatis sed Cras elit dolor malesuada tincidunt odio quis Nunc Nunc commodo
                            id In convallis. tincidunt efficitur. scelerisque gravida Donec Nullam ipsum
                        </p>

                        <p>
                            cursus placerat Vestibulum lacus, vitae faucibus ex tempor placerat. risus amet,
                            urna amet, ullamcorper sodales. placerat tempor ex. placerat fringilla orci
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}


const Carte = () => {
    return (
        <div className="container mx-auto px-4 py-24">
            <InteractiveWorldMap/>
        </div>
    )
}

const Quizz = () => {
    return (
        <Section className="relative min-h-screen flex flex-col items-center justify-center px-6">
            <Squeeze/>
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