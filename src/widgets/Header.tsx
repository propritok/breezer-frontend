'use client';

import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader } from '@heroui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type NavItem = { href: string; label: string };

const navItems: NavItem[] = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/about', label: 'О нас' },
  { href: '/contact', label: 'Контакты' },
  { href: '/certificates', label: 'Сертификаты' },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Блокируем скролл боди, когда открыт Drawer
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b'>
      <div className='max-w-7xl mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link href='/' className='text-2xl font-bold text-[var(--secondary-color)]'>
              Propritok
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className='hidden md:flex items-center space-x-8'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='text-gray-700 hover:text-[var(--secondary-color)] transition-colors'>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Burger */}
          <div className='flex items-center space-x-4'>
            <Button
              color='primary'
              className='hidden md:inline-flex bg-[var(--secondary-color)] text-white'>
              Заказать звонок
            </Button>

            {/* Burger (mobile) */}
            <button
              type='button'
              className='md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--secondary-color)]'
              aria-label='Открыть меню'
              aria-expanded={open}
              onClick={() => setOpen(true)}>
              <span className='sr-only'>Toggle menu</span>
              <svg
                className='h-5 w-5'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'>
                <path d='M3 6h18' />
                <path d='M3 12h18' />
                <path d='M3 18h18' />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        closeButton={<>{null}</>}
        isOpen={open}
        onOpenChange={setOpen}
        placement='right'
        size='sm'
        className='md:hidden rounded-none'>
        <DrawerContent>
          <DrawerHeader className='border-b'>
            <div className='flex w-full items-center justify-between'>
              <Link
                href='/'
                className='text-xl font-bold text-[var(--secondary-color)]'
                onClick={closeMenu}>
                Propritok
              </Link>
              <Button
                variant='flat'
                onPress={closeMenu}
                className='min-w-0 h-9 w-9 p-0'
                aria-label='Закрыть меню'>
                <svg
                  className='h-5 w-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'>
                  <path d='M6 18L18 6M6 6l12 12' />
                </svg>
              </Button>
            </div>
          </DrawerHeader>

          <DrawerBody className='px-4 py-3'>
            <nav>
              <ul className='space-y-1'>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className='block rounded-md px-3 py-2 text-gray-800 hover:bg-gray-50 hover:text-[var(--secondary-color)] transition-colors'
                      onClick={closeMenu}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className='mt-4'>
              <Button
                color='primary'
                className='w-full bg-[var(--secondary-color)] text-white'
                onPress={closeMenu}>
                Заказать звонок
              </Button>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Header;
