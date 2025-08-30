"use client";

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { forwardRef, useEffect, useState } from "react";

import avatarImage from "@/images/avatar.png";
import {
  ArticleIcon,
  CloseIcon,
  HomeIcon,
  MenuIcon,
  MoonIcon,
  ProjectIcon,
  SunIcon,
} from "./MiscIcons";

/* ---------------- NAVIGATION CONFIG ---------------- */
const navigationItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/articles", label: "Articles", icon: ArticleIcon },
  { href: "/projects", label: "Projects", icon: ProjectIcon },
];

/* ---------------- FIX: FORWARD REF LINK ---------------- */
const PopoverLink = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ href, className, children, ...props }, ref) => (
  <Link ref={ref} href={href!} className={className} {...props}>
    {children}
  </Link>
));
PopoverLink.displayName = "PopoverLink";

/* ---------------- MOBILE NAV ITEM ---------------- */
function MobileNavItem({
  href,
  children,
  icon: Icon,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  const isActive = usePathname() === href;

  return (
    <li>
      <PopoverButton as={PopoverLink} href={href} className="block py-3">
        <div className="flex items-center gap-3">
          <Icon
            className={clsx(
              "h-5 w-5",
              isActive
                ? "text-teal-500 dark:text-teal-400"
                : "text-zinc-600 dark:text-zinc-400"
            )}
          />
          <span
            className={clsx(
              "font-medium",
              isActive
                ? "text-teal-500 dark:text-teal-400"
                : "text-zinc-800 dark:text-zinc-200"
            )}
          >
            {children}
          </span>
        </div>
      </PopoverButton>
    </li>
  );
}

/* ---------------- MOBILE NAVIGATION ---------------- */
function MobileNavigation() {
  return (
    <Popover>
      <PopoverButton className="flex items-center justify-center rounded-full bg-white/90 p-3 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10">
        <MenuIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        <span className="sr-only">Open navigation menu</span>
      </PopoverButton>
      <PopoverBackdrop className="fixed inset-0 z-40 bg-zinc-800/40 backdrop-blur-sm" />
      <PopoverPanel className="fixed bottom-20 left-4 right-4 z-50 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Navigation
          </h2>
          <PopoverButton className="-m-1 p-1">
            <CloseIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
          </PopoverButton>
        </div>
        <nav>
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <MobileNavItem key={item.href} href={item.href} icon={item.icon}>
                {item.label}
              </MobileNavItem>
            ))}
          </ul>
        </nav>
      </PopoverPanel>
    </Popover>
  );
}

/* ---------------- DESKTOP NAVIGATION ---------------- */
function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isActive = usePathname() === href;
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "relative block px-3 py-2 transition",
          isActive
            ? "text-teal-500 dark:text-teal-400"
            : "text-zinc-800 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400"
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:via-teal-400/40" />
        )}
      </Link>
    </li>
  );
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/articles">Articles</NavItem>
        <NavItem href="/projects">Projects</NavItem>
      </ul>
    </nav>
  );
}

/* ---------------- THEME TOGGLE ---------------- */
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted)
    return (
      <div className="h-9 w-9 rounded-full bg-white/90 shadow-lg ring-1 dark:bg-zinc-800/90" />
    );

  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-lg ring-1 ring-zinc-900/5 backdrop-blur-sm transition hover:ring-zinc-900/10 dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <SunIcon className="h-5 w-5 stroke-zinc-500 dark:hidden" />
      <MoonIcon className="hidden h-5 w-5 stroke-zinc-500 dark:block" />
    </button>
  );
}

/* ---------------- AVATAR ---------------- */
function Avatar({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link aria-label="Home" className={clsx("block", className)} {...props}>
      <Image
        src={avatarImage}
        alt="Avatar"
        sizes="2.25rem"
        className="h-9 w-9 rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
        priority
      />
    </Link>
  );
}

/* ---------------- HEADER ---------------- */
export function Header() {
  // const isHomePage = usePathname() === "/";

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden left-0 md:block sticky top-0 z-50 bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80">
        <div className="flex h-16 items-center justify-between py-4 px-4">
          <div className="mr-0 h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 dark:bg-zinc-800/90">
            <Avatar href="/" />
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <DesktopNavigation />
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <div className="flex items-center justify-between rounded-2xl bg-white/90 px-4 py-3 shadow-lg ring-1 backdrop-blur-sm dark:bg-zinc-800/90">
          <Avatar href="/" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <MobileNavigation />
          </div>
        </div>
      </header>
    </>
  );
}
