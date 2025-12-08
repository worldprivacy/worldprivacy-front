'use client'

import { useState } from 'react'
import { HoverCardTrigger, HoverCard } from '@/components/ui/hover-card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)

    const links = [
        { name: "Carte", href: "/carte" },
        { name: "Quizz", href: "/quizz" },
        { name: "FAQ", href: "/faq" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 z-50
                backdrop-blur-md transition-all duration-300 border-b border-border bg-background/20">

            {/* Logo */}
            <div className="text-2xl md:text-3xl font-bold">
                <Link href="/" suppressHydrationWarning={true}>
                    <span className="text-primary hover:opacity-80 transition-all duration-300">
                        World
                    </span>
                    <span className="text-orange-500 hover:opacity-80 transition-all duration-300">
                        Privacy.
                    </span>
                </Link>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex gap-6">
                {links.map((link, index) => (
                    <HoverCard key={index}>
                        <HoverCardTrigger className="relative" asChild>
                            <Link
                                href={link.href}
                                className="hover:text-orange-500 transition-colors"
                            >
                                {link.name}
                            </Link>
                        </HoverCardTrigger>
                    </HoverCard>
                ))}
            </div>

            {/* Menu Hamburger Mobile */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="md:hidden" asChild>
                    <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                        <Menu className="h-6 w-6" />
                    </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <div className="flex flex-col gap-6 mt-8">
                        {/* Logo dans le menu */}
                        <div className="text-2xl font-bold mb-4">
                            <Link href="/" onClick={() => setIsOpen(false)}>
                                <span className="text-primary">World</span>
                                <span className="text-orange-500">Privacy.</span>
                            </Link>
                        </div>

                        {/* Liens de navigation */}
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium hover:text-orange-500 transition-colors py-2 border-b border-gray-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    );
}

export { Nav };