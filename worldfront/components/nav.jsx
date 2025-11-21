'use client'

import {HoverCardTrigger, HoverCard} from '@/components/ui/hover-card'
import Link from 'next/link'

const Nav = () => {

    const links = [
        { name: "Carte", href: "/carte" },
        { name: "Quizz", href: "/quizz" },
        { name: "FAQ", href: "/faq" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 z-50
                backdrop-blur-md transition-all duration-300 border-b-1 border-black rounded-md">

            <div className="text-3xl font-bold flex-row">
                <Link suppressHydrationWarning={true} href="/">
                    <span className="text-primary hover:opacity-80 transition-all duration-300">
                        World
                    </span>
                    <span className="text-orange-500 hover:opacity-80 transition-all duration-300">
                        Privacy.
                    </span>
                </Link>
            </div>

            {/* Liens de navigation */}
            <div className="hidden md:flex gap-6">
                {links.map((link, index) => (
                    <HoverCard key={index}>
                        <HoverCardTrigger className="relative" asChild>
                            <Link
                                href={link.href}
                                className="hover:text-orange-500"
                            >
                                {link.name}
                            </Link>
                        </HoverCardTrigger>
                    </HoverCard>
                ))}
            </div>
        </nav>
    );
}

export {Nav};