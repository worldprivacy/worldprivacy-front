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
import CountryCompare from "@/components/countryCompare";

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
            <section className="relative min-h-screen w-full overflow-hidden pt-16 md:pt-0">
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
                <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center min-h-screen">
                    <div className="max-w-3xl space-y-6 md:space-y-8">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            Découvrez comment vos données sont protégées à travers le monde
                        </h1>

                        {/* Bouton CTA */}
                        <div>
                            <Button
                                asChild
                                size="lg"
                                className="bg-purple-900 hover:bg-purple-800 text-white px-8 md:px-12 py-4 md:py-6 text-base md:text-xl rounded-md shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
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
            <section className="bg-background py-12 md:py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    {/* Grille des icônes et titres */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                                {/* Icône */}
                                <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
                                    <feature.icon className="w-14 h-14 md:w-20 md:h-20 text-primary stroke-[1.5]"/>
                                </div>
                                {/* Titre */}
                                <h3 className={`text-lg md:text-xl lg:text-2xl font-semibold ${feature.color}`}>
                                    {feature.title}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {/* Textes descriptifs */}
                    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 text-foreground leading-relaxed text-sm md:text-base">
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
                <div className="mt-8 md:mt-10 px-4">
                    <CountryCompare/>
                </div>
            </section>
        </>
    )
}

const MentionsLegales = () => {
  const equipe = [
    "Martin DELHAYE",
    "Mame Cisse",
    "Nathan MARIJNISSEN",
    "Sanou FANE",
    "Teremana HONORÉ"
  ];

  return (
    <main className="min-h-screen bg-background pt-20 pb-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Mentions légales</h1>

        <p className="text-sm text-muted-foreground mb-6">
          Ce site a été réalisé dans le cadre d’un <strong>projet scolaire universitaire</strong> par une équipe de <strong>5 étudiants</strong>, dans le cadre du cours de <strong>conception et programmation web</strong>, à <strong>L'UQAC</strong>.
          Il n’a pas de vocation commerciale et sert uniquement à des fins pédagogiques.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Équipe du projet</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            {equipe.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Conditions d'utilisation</h2>
          <p className="text-sm mb-2">
            Ce site est fourni à des fins pédagogiques. Les informations peuvent contenir des erreurs ou omissions.
            L’utilisation du site se fait sous la responsabilité de l’utilisateur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Données personnelles</h2>
          <p className="text-sm mb-2">
            Ce site <strong>ne collecte pas de données personnelles</strong>.
            Aucune donnée n’est stockée ou partagée à des fins commerciales.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Propriété intellectuelle</h2>
          <p className="text-sm">
            Le code source et les éléments visuels sont la propriété de l’équipe du projet. Leur réutilisation nécessite l’accord de l’équipe.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3">Limitation de responsabilité</h2>
          <p className="text-sm">
            L’équipe étudiante ne peut être tenue responsable des erreurs, d’un mauvais usage du site ou de dysfonctionnements.
          </p>
        </section>

        <footer className="text-sm text-muted-foreground">
          <p className="mt-3">Dernière mise à jour : {new Date().toLocaleDateString()}</p>
        </footer>
      </div>
    </main>
  );
};



const Carte = () => {
    return (
        <div className="container mx-auto px-4 py-20 md:py-24">
            <InteractiveWorldMap/>
        </div>
    )
}

const Quizz = () => {
    return (
        <Section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 pt-20">
            <Squeeze/>
        </Section>
    )
}

const FAQ = () => {
    const timelineItems = [
        {
            title: "Sécuriser ses mots de passe",
            content: "Des mots de passe forts sont la première barrière contre les intrusions et les piratages.",
            paragraphs: [
                "Un bon mot de passe doit être long (au moins 12 à 14 caractères) et mélanger lettres, chiffres et symboles. Il vaut mieux éviter les informations faciles à deviner comme une date de naissance, le nom d’un proche ou un mot utilisé partout.",
                "Il est recommandé d’utiliser un gestionnaire de mots de passe pour créer et enregistrer automatiquement des mots de passe uniques pour chaque service. Cela réduit les risques en cas de fuite d’un site ou d’une application."
            ],
            side: "left"
        },
        {
            title: "Activer l’authentification à deux facteurs (2FA)",
            content: "La 2FA ajoute une couche de sécurité qui rend le piratage beaucoup plus difficile.",
            paragraphs: [
                "Même avec un bon mot de passe, un compte peut être vulnérable. La 2FA exige une vérification supplémentaire : un code par SMS, une notification dans une application ou une clé physique de sécurité.",
                "Ainsi, même si quelqu’un obtient votre mot de passe, il ne pourra pas accéder à votre compte sans cette deuxième preuve. Beaucoup de services (Google, Facebook, banques, etc.) recommandent ou imposent déjà ce mécanisme."
            ],
            side: "right"
        },
        {
            title: "Mettre à jour ses appareils et ses applications",
            content: "Les mises à jour corrigent des failles de sécurité que les pirates exploitent activement.",
            paragraphs: [
                "Chaque mise à jour inclut des correctifs qui protègent contre de nouvelles attaques. Reporter les mises à jour ouvre la porte à des vulnérabilités connues.",
                "Il est conseillé d’activer les mises à jour automatiques sur les téléphones, les ordinateurs, les navigateurs et les applications. Garder ses appareils à jour permet de réduire considérablement le risque d’intrusion ou de vol de données."
            ],
            side: "left"
        },
        {
            title: "Vérifier les permissions de ses applications",
            content: "Certaines applications collectent plus de données que nécessaire pour fonctionner.",
            paragraphs: [
                "Avant d’installer une application, il est important de vérifier les accès qu’elle demande : localisation, contacts, micro, caméra… Une application de lampe torche n’a pas besoin d’accéder à vos photos, par exemple.",
                "Il est conseillé de réviser régulièrement les permissions dans les réglages du téléphone et de désactiver celles qui ne sont pas essentielles. Limiter ces accès permet de réduire la collecte inutile de données personnelles."
            ],
            side: "right"
        },
        {
            title: "Se protéger contre les liens et messages suspects",
            content: "Les cyberattaques commencent souvent par un simple message frauduleux.",
            paragraphs: [
                "Les tentatives de phishing imitent des entreprises ou des organismes officiels pour vous pousser à cliquer sur un lien ou à partager un code. Il faut toujours vérifier l’adresse de l’expéditeur, les fautes dans le message ou l’urgence exagérée (“Votre compte sera supprimé !”).",
                "Ne jamais cliquer sur un lien douteux ni télécharger une pièce jointe inattendue. En cas de doute, il vaut mieux contacter directement l’entreprise via son vrai site web."
            ],
            side: "left"
        },
        {
            title: "Limiter les informations partagées en ligne",
            content: "Ce que vous publiez en ligne peut être récupéré, partagé ou utilisé à votre insu.",
            paragraphs: [
                "Chaque photo, commentaire ou information personnelle laissée en ligne laisse une trace numérique durable. Partager son lieu de résidence, des documents officiels, ses déplacements ou des informations sensibles augmente les risques d’usurpation d’identité ou de surveillance.",
                "Il est préférable de réfléchir avant de publier : “Est-ce que j’ai vraiment besoin de partager ça ?” Ajuster la confidentialité des réseaux sociaux et éviter les publications publiques pour les contenus privés aide à garder le contrôle."
            ],
            side: "right"
        }
    ]

    const faqItems = [
        {
            question: "Qu’est-ce qu’une donnée personnelle ?",
            answer: "Une donnée personnelle est toute information qui permet d’identifier une personne : nom, adresse, numéro de téléphone, localisation, habitudes en ligne, photos, identifiants de connexion, etc. Même une adresse IP peut être considérée comme une donnée personnelle"
        },
        {
            question: "Pourquoi les entreprises collectent-elles mes données ?",
            answer: "Les données sont utilisées pour améliorer les services, personnaliser les contenus, proposer de la publicité ciblée ou analyser les comportements des utilisateurs. Certaines entreprises les revendent aussi à des partenaires commerciaux."
        },
        {
            question: "Est-ce que mes données sont protégées de la même façon dans tous les pays",
            answer: "Non. Les lois varient énormément d’un pays à l’autre. Certains pays ont des règles très strictes, comme le RGPD en Europe, tandis que d’autres offrent une protection beaucoup plus faible. WorldPrivacy permet de visualiser rapidement ces différences"
        },
        {
            question: "Comment savoir si un site web est sécurisé",
            answer: "Un site sécurisé utilise HTTPS (le cadenas dans la barre d’adresse) et possède une politique de confidentialité claire. Il ne demande que les informations nécessaires et ne redirige pas vers des pages inconnues ou suspectes"
        },
        {
            question: "Que faire si je pense que mes données ont été piratées",
            answer: "Il faut changer immédiatement les mots de passe, activer la 2FA, vérifier les connexions récentes, contacter le service concerné et surveiller ses comptes bancaires. Dans certains cas, il est utile de signaler l’incident aux autorités compétentes"
        },
        {
            question: "Comment réduire ma trace numérique au quotidien",
            answer: "Vous pouvez limiter les informations publiées, supprimer les comptes inutilisés, utiliser des outils comme un VPN, nettoyer régulièrement votre historique, vérifier les permissions des applications et désactiver le suivi publicitaire lorsque c’est possible"
        }
    ];

    return (
        <div className="min-h-screen bg-background pt-20">
            {/* Section Timeline */}
            <section className="container mx-auto px-4 py-12 md:py-25">
                <div className="relative">
                    {/* Ligne centrale - cachée sur mobile */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-500 via-purple-400 to-orange-500 opacity-30"/>

                    <div className="space-y-8 md:space-y-12">
                        {timelineItems.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row gap-6 md:gap-8 items-center ${
                                    item.side === "right" ? "md:flex-row-reverse" : ""
                                }`}
                            >
                                {/* Carte */}
                                <div className={`w-full md:w-5/12 ${
                                    item.side === "left"
                                        ? "bg-white border-4 border-orange-500 text-foreground"
                                        : "bg-purple-200 text-foreground"
                                } rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg`}>
                                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{item.title}</h3>
                                    <p className="mb-3 md:mb-4 text-sm leading-relaxed">{item.content}</p>
                                    {item.paragraphs.map((para, i) => (
                                        <p key={i} className="mb-3 md:mb-4 text-sm leading-relaxed">
                                            {para}
                                        </p>
                                    ))}
                                </div>

                                {/* Point central - caché sur mobile */}
                                <div className="hidden md:flex w-2/12 justify-center">
                                    <div className="w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg"/>
                                </div>

                                {/* Espace vide de l'autre côté - caché sur mobile */}
                                <div className="hidden md:block w-5/12"/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section FAQ Accordion */}
            <section className="container mx-auto px-4 py-12 md:py-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12">
                    Questions souvent posées
                </h2>

                <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
                    {faqItems.map((item, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border-2 border-border rounded-xl md:rounded-2xl px-4 md:px-6 overflow-hidden"
                        >
                            <AccordionTrigger className="text-left font-bold text-base md:text-lg hover:no-underline py-4 md:py-6">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground pb-4 md:pb-6 text-sm md:text-base">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    )
    
}

export {HomePage, Carte, Quizz, FAQ, MentionsLegales};