import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-accent/20">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
                        <h3 className="font-heading text-lg font-semibold mb-4 text-secondary">Контакты</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 group">
                                <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                                <a href="tel:79991234567" className="text-muted-foreground hover:text-primary transition-colors">
                                    +7 (999) 123-45-67
                                </a>
                            </li>
                            <li className="flex items-center gap-2 group">
                                <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                                <a href="mailto:info@essense.com" className="text-muted-foreground hover:text-primary transition-colors">
                                    info@essense.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2 group">
                                <MapPin className="w-4 h-4 mt-1 text-primary group-hover:scale-110 transition-transform" />
                                <span className="text-muted-foreground">г. Великий Новгород, ул. Германа, д. 1</span>
                            </li>
                        </ul>
                    </div>

                    <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
                        <h3 className="font-heading text-lg font-semibold mb-4 text-secondary">Навигация</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/"
                                      className="text-muted-foreground hover:text-primary transition-colors inline-block">
                                    Главная
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects"
                                      className="text-muted-foreground hover:text-primary transition-colors inline-block">
                                    Проекты
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog"
                                      className="text-muted-foreground hover:text-primary transition-colors inline-block">
                                    Блог
                                </Link>
                            </li>
                            <li>
                                <Link to="/comments"
                                      className="text-muted-foreground hover:text-primary transition-colors inline-block">
                                    Отзывы
                                </Link>
                            </li>
                            <li>
                                <Link to="/about"
                                      className="text-muted-foreground hover:text-primary transition-colors inline-block">
                                    О нас
                                </Link>
                            </li>
                            <li>
                                <Link to="/contacts"
                                      className="text-muted-foreground hover:text-primary transition-colors inline-block">
                                    Контакты
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="animate-fade-up" style={{animationDelay: "300ms"}}>
                        <h3 className="font-heading text-lg font-semibold mb-4 text-secondary">Мы в соцсетях</h3>
                        <div className="flex gap-4">
                            <a
                                href="#facebook"
                                className="w-10 h-10 rounded-full flex items-center justify-center bg-muted hover:bg-accent/30 text-primary hover:text-secondary transition-all duration-300 shadow-sm"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#instagram"
                                className="w-10 h-10 rounded-full flex items-center justify-center bg-muted hover:bg-accent/30 text-primary hover:text-secondary transition-all duration-300 shadow-sm"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#linkedin"
                                className="w-10 h-10 rounded-full flex items-center justify-center bg-muted hover:bg-accent/30 text-primary hover:text-secondary transition-all duration-300 shadow-sm"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-accent/20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} EssenseHouse. Все права защищены.
                        </p>
                        <div className="flex gap-6 text-sm text-muted-foreground">
                            <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                                Политика конфиденциальности
                            </Link>
                            <Link to="/terms-of-use" className="hover:text-primary transition-colors">
                                Условия использования
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
