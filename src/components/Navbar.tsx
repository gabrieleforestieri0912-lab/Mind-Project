'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Dumbbell,
  Mail,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Flame,
  HelpCircle,
  Brain,
} from 'lucide-react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

interface NavUser {
  name?: string;
  email?: string;
  image?: string;
}

export default function Navbar() {
  const { session: supabaseSession, signOut: supabaseSignOut } = useSupabaseAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<NavUser | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const supabaseUser = supabaseSession?.user;
    if (supabaseUser) {
      setIsLoggedIn(true);
      setUser({
        name: supabaseUser.user_metadata?.full_name as string || supabaseUser.email,
        email: supabaseUser.email || '',
        image: supabaseUser.user_metadata?.avatar_url as string || '',
      });
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [supabaseSession]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showProfileMenu &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  const handleLogout = async () => {
    try {
      await supabaseSignOut();
      setIsLoggedIn(false);
      setUser(null);
      router.push('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const getInitials = () => {
    if (!user) return 'U';
    if (user.name) {
      return user.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2);
    }
    return (user.email || 'U')[0].toUpperCase();
  };

const navLinks = [
  { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
  {
    name: 'Servizi',
      href: '/services',
      icon: <Dumbbell className="w-4 h-4" />,
      submenu: [
        { name: 'Piani e Offerte', href: '/services' },
        { name: 'Videocorso', href: '/academy/mind-project' },
        { name: 'Chiamate Registrate', href: '/mind-project/chiamate' },
      ],
    },
    {
      name: 'Sfida 30',
      href: '/habit/challenge',
      icon: <Flame className="w-4 h-4" />,
    },
    {
      name: 'FAQ',
      href: '/#faq',
      icon: <HelpCircle className="w-4 h-4" />,
    },
    {
      name: 'Contatti',
      href: '/contacts',
      icon: <Mail className="w-4 h-4" />,
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div
            className={`relative flex items-center justify-between px-3 sm:px-4 py-2 rounded-xl transition-all duration-500 ${
              scrolled
                ? 'bg-[#050505]/80 backdrop-blur-2xl border border-white/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.4)]'
                : 'bg-white/[0.02] backdrop-blur-md border border-white/[0.04]'
            }`}
          >
            <Link href="/" className="flex items-center gap-2 group relative">
              <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/assets/mind-project-icon.png"
                  alt="Logo"
                  fill
                  sizes="40px"
                  className="object-contain relative z-10"
                />
              </div>
              <span className="text-base font-black italic tracking-tighter hidden sm:block">
                MIND
                <span className="text-accent-primary">PROJECT</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-4">
              {navLinks.map((link, idx) => (
                <div key={idx} className="relative group">
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-lg text-[10px] xl:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      router.pathname === link.href
                        ? 'text-accent-primary'
                        : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    {link.icon}
                    {link.name}
                    {link.submenu && (
                      <ChevronDown className="w-3.5 h-3.5 opacity-80 group-hover:text-accent-primary group-hover:opacity-100 group-hover:rotate-180 transition-all duration-300" />
                    )}
                    {router.pathname === link.href && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-white/[0.06] rounded-lg border border-white/[0.08]"
                        transition={{
                          type: 'spring',
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </Link>

                  {link.submenu && (
                    <div className="absolute top-full left-0 mt-1.5 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                      <div className="bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/[0.06] rounded-xl p-1.5 shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
                        {link.submenu.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            className="flex items-center px-3 py-2 rounded-lg text-sm font-bold text-gray-500 hover:text-accent-primary hover:bg-white/[0.04] transition-all duration-200"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-1.5 bg-accent-primary text-black px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider hover:shadow-[0_0_15px_rgba(255,180,0,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Accedi
                </Link>
              ) : (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className={`relative group/avatar w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 active:scale-90 shadow-md ${
                      showProfileMenu
                        ? 'ring-2 ring-accent-primary shadow-[0_0_12px_rgba(255,180,0,0.4)]'
                        : 'ring-2 ring-white/20 hover:ring-accent-primary hover:shadow-[0_0_10px_rgba(255,180,0,0.25)]'
                    }`}
                  >
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-[#1c1c1f] flex items-center justify-center">
                      {user?.image ? (
                        <Image
                          src={user.image}
                          alt="Profile"
                          fill
                          sizes="32px"
                          className="object-cover group-hover/avatar:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-xs font-black text-accent-primary">{getInitials()}</span>
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full right-0 mt-2 w-56 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/[0.06] rounded-xl p-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.8)] z-50"
                      >
                        <div className="px-3 py-2 mb-1">
                          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-accent-primary mb-0.5">
                            Area Riservata
                          </p>
                          <p className="text-white font-black italic text-sm leading-tight truncate">
                            {user?.name || user?.email || 'Membro'}
                          </p>
                        </div>
                        <div className="space-y-0.5">
                          <Link
                            href="/academy/mind-project"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-gray-500 hover:text-white hover:bg-white/[0.04] transition-all"
                          >
                            <Brain className="w-3.5 h-3.5 text-accent-primary" />
                            Il Mio Video Corso
                          </Link>
                          <Link
                            href="/profile"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-gray-500 hover:text-white hover:bg-white/[0.04] transition-all"
                          >
                            <User className="w-3.5 h-3.5 text-accent-primary" />
                            Il tuo Profilo
                          </Link>
                          <Link
                            href="/settings"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-gray-500 hover:text-white hover:bg-white/[0.04] transition-all"
                          >
                            <Settings className="w-3.5 h-3.5 text-accent-primary" />
                            Impostazioni
                          </Link>
                        </div>
                        <div className="h-px bg-white/[0.04] my-1.5 mx-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Disconnetti
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white active:scale-90 transition-all hover:bg-white/[0.06]"
              >
                {showMobileMenu ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] lg:hidden bg-[#050505]/98 backdrop-blur-2xl"
          >
            <div className="flex flex-col h-full pt-20 pb-6 px-4">
              <ul className="space-y-1.5">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-3 text-2xl font-black italic uppercase tracking-tighter text-white hover:text-accent-primary transition-all py-2"
                    >
                      <span className="text-accent-primary/20 text-xs font-mono">
                        0{idx + 1}
                      </span>
                      {link.name}
                    </Link>
                    {link.submenu && (
                      <ul className="mt-1 ml-10 space-y-1">
                        {link.submenu.map((sub, sIdx) => (
                          <li key={sIdx}>
                            <Link
                              href={sub.href}
                              onClick={() => setShowMobileMenu(false)}
                              className="text-gray-600 font-bold hover:text-white transition-all text-xs"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto space-y-3">
                <div className="h-px bg-white/[0.06]" />
                {!isLoggedIn ? (
                  <Link
                    href="/login"
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center justify-center w-full bg-accent-primary text-black py-3 rounded-xl text-sm font-black uppercase tracking-wider"
                  >
                    Accedi ora
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center justify-center w-full bg-red-500/10 text-red-400 py-3 rounded-xl text-sm font-black uppercase tracking-wider"
                  >
                    Disconnetti
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
