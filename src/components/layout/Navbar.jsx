import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Sub-components
import NavLogo from './navbar/NavLogo';
import NavLinks from './navbar/NavLinks';
import UserMenu from './navbar/UserMenu';
import MobileMenu from './navbar/MobileMenu';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
                scrolled || !isHome
                    ? 'bg-white shadow-sm' 
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-6">
                <div className="h-16 flex items-center justify-between">
                    <NavLogo scrolled={scrolled} isHome={isHome} />
                    
                    <NavLinks scrolled={scrolled} isHome={isHome} />
                    


                    <UserMenu 
                        user={user} 
                        logout={logout} 
                        scrolled={scrolled} 
                        isHome={isHome} 
                    />

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`md:hidden p-2 ${scrolled || !isHome ? 'text-slate-600' : 'text-white'}`}
                    >
                        <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
                    </button>
                </div>
            </div>

            <MobileMenu 
                isOpen={mobileMenuOpen} 
                user={user} 
                logout={logout} 
            />
        </header>
    );
};

export default Navbar;

