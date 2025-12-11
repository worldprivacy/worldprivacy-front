import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail, Facebook, Twitter, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">
                            <span className="text-primary">World</span>
                            <span className="text-orange-500">Privacy</span>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Sensibilisons ensemble sur la protection des données personnelles en ligne.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Navigation</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                                    Accueil
                                </Link>
                            </li>
                        </ul>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/carte" className="text-muted-foreground hover:text-primary transition-colors">
                                    Carte
                                </Link>
                            </li>
                        </ul>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/quizz" className="text-muted-foreground hover:text-primary transition-colors">
                                    Quizz
                                </Link>
                            </li>
                        </ul>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Légal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/mentions-legales" className="text-muted-foreground hover:text-primary transition-colors">
                                    Mentions légales
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Nous suivre</h4>
                        <div className="flex gap-3">
                            <Button variant="outline" size="icon" asChild>
                                <Link href="https://github.com/worldprivacy" target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>
                        © {new Date().getFullYear()}{" "}
                        <span className="text-primary">World</span>
                        <span className="text-orange-500">Privacy</span>. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
}