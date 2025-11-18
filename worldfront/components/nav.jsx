'use client'

import {HoverCardTrigger, HoverCard} from '@/components/ui/hover-card'
import Link from 'next/link'

const Nav = () => {

    const links = [
        { name: "Qui sommes nous ?", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 z-50
                backdrop-blur-md transition-all duration-300 border-b-1">

            <div className="text-3xl font-bold">
                <Link suppressHydrationWarning={true} href="/">
                    <span className="text-primary hover:opacity-80 transition-all duration-300">
                        WorldPrivacy.
                    </span>
                </Link>
            </div>

            {/* Liens de navigation */}
            <div className="hidden md:flex gap-6">
                {links.map((link, index) => (
                    <HoverCard key={index}>
                        <HoverCardTrigger className="relative">
                            <Link
                                suppressHydrationWarning={true}
                                href={link.href}
                                className="hover:text-fuchsia-500"
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