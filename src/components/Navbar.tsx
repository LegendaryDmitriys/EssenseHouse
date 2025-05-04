import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, FileText, User, MessageCircle, Phone, Info, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const useWhiteText = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { title: 'Главная', path: '/', icon: <Home size={18} /> },
    { title: 'Проекты', path: '/projects', icon: <Home size={18} /> },
    { title: 'О нас', path: '/about', icon: <Info size={18} /> },
    { title: 'Блог', path: '/blog', icon: <FileText size={18} /> },
    { title: 'Отзывы', path: '/comments', icon: <MessageCircle size={18} /> },
    { title: 'Контакты', path: '/contacts', icon: <Phone size={18} /> },
    { title: 'Политика конфиденциальности', path: '/privacy-policy', icon: <FileText size={18} />, mobileOnly: true },
    { title: 'Условия использования', path: '/terms-of-use', icon: <FileText size={18} />, mobileOnly: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
      <header
          className={cn(
              "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
              isScrolled || !isHomePage
                  ? "bg-white/90 backdrop-blur-md shadow-md"
                  : "bg-transparent"
          )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            <Link
                to="/"
                className={cn(
                    "flex items-center space-x-2 transition-colors",
                    useWhiteText ? "text-white" : "text-primary hover:text-secondary"
                )}
            >
              <span className="text-xl font-heading font-bold">EssenseHouse</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.filter(link => !link.mobileOnly).map((link) => (
                  <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                          "flex items-center space-x-1 text-sm transition-colors",
                          isActive(link.path)
                              ? useWhiteText ? "text-white font-medium" : "text-primary font-medium"
                              : useWhiteText
                                  ? "text-white/80 hover:text-white"
                                  : "text-muted-foreground hover:text-primary"
                      )}
                  >
                    <span>{link.title}</span>
                  </Link>
              ))}

              <Link
                  to="/profile"
                  className={cn(
                      "flex items-center space-x-1 text-sm transition-colors py-1 px-3 rounded-full border",
                      useWhiteText
                          ? "text-white/90 hover:text-white border-white/20 hover:border-white/40"
                          : "text-muted-foreground hover:text-primary border-primary/20 hover:border-primary"
                  )}
              >
                <User size={16} />
                <span>Личный кабинет</span>
              </Link>

              <Button
                  className={cn(
                      "ml-2",
                      useWhiteText
                          ? "bg-white text-primary hover:bg-white/90"
                          : "bg-primary text-white hover:bg-primary/90"
                  )}
              >
                Связаться с нами
              </Button>
            </nav>

            <button
                className={cn(
                    "md:hidden transition-colors",
                    useWhiteText ? "text-white hover:text-white/80" : "text-secondary hover:text-primary"
                )}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg animate-fade-in">
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                      <Link
                          key={link.path}
                          to={link.path}
                          className={cn(
                              "flex items-center space-x-2 p-2 rounded-md transition-colors",
                              isActive(link.path)
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                          )}
                      >
                        {link.icon}
                        <span>{link.title}</span>
                      </Link>
                  ))}

                  <Link
                      to="/profile"
                      className="flex items-center space-x-2 p-2 rounded-md transition-colors bg-secondary/5 text-secondary hover:bg-secondary/10"
                  >
                    <User size={18} />
                    <span className="font-medium">Личный кабинет</span>
                  </Link>

                  <div className="pt-2">
                    <Button className="w-full">Связаться с нами</Button>
                  </div>
                </nav>
              </div>
            </div>
        )}
      </header>
  );
};

export default Navbar;
