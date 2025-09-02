"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarClock,
  ChefHat,
  House,
  NotepadText,
  PackageCheck,
  Rows3,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";

// ===== TYPES =====
interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

interface NavigationItem {
  id: string;
  href: string;
  icon: LucideIcon;
  label: string;
}

// ===== CONSTANTS =====
const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: "dashboard", href: "/dashboard", icon: House, label: "Início" },
  { id: "etiquetas", href: "/etiquetas", icon: ScrollText, label: "Etiquetas" },
  { id: "validades", href: "/validades", icon: CalendarClock, label: "Validades" },
  { id: "producao", href: "/producao", icon: ChefHat, label: "Produção" },
  { id: "recebimento", href: "/recebimento", icon: PackageCheck, label: "Recebimento" },
  { id: "armazem", href: "/armazem", icon: Rows3, label: "Armazém" },
  { id: "relatorios", href: "/relatorios", icon: NotepadText, label: "Relatórios" },
] as const;

const STYLES = {
  sidebar: {
    base: "fixed flex flex-col bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40",
    collapsed: "w-0 md:w-16",
    expanded: "w-72 md:w-64",
  },
  header: {
    base: "flex items-center pt-8 pb-4",
    collapsed: "justify-center px-2",
    expanded: "justify-start px-8 gap-3",
  },
  logo: {
    title: "font-extrabold text-2xl text-gray-800",
  },
  button: {
    toggle: "px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300",
  },
  link: {
    base: "cursor-pointer flex items-center hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors",
    collapsed: "justify-center py-4",
    expanded: "justify-start px-8 py-4",
    active: "bg-blue-200 text-blue-700",
  },
  footer: {
    base: "mb-10 transition-opacity duration-200",
    text: "text-center text-xs text-gray-500",
  },
} as const;

// ===== UTILS =====
const isActiveLink = (pathname: string, href: string): boolean => {
  return pathname === href || (pathname === "/" && href === "/dashboard");
};

const buildClassName = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

// ===== COMPONENTS =====
const SidebarLink = React.memo<SidebarLinkProps>(({
  href,
  icon: Icon,
  label,
  isCollapsed,
}) => {
  const pathname = usePathname();
  const isActive = isActiveLink(pathname, href);

  const linkClassName = buildClassName(
    STYLES.link.base,
    isCollapsed ? STYLES.link.collapsed : STYLES.link.expanded,
    isActive && STYLES.link.active
  );

  return (
    <Link href={href} className={linkClassName}>
      <Icon 
        className="w-6 h-6 text-gray-700 flex-shrink-0" 
        aria-hidden="true" 
      />
      <span
        className={buildClassName(
          isCollapsed ? "hidden" : "block",
          "font-medium text-gray-700 transition-opacity"
        )}
      >
        {label}
      </span>
    </Link>
  );
});

SidebarLink.displayName = "SidebarLink";

const SidebarHeader = React.memo<{
  isCollapsed: boolean;
}>(({ isCollapsed }) => {
  const headerClassName = buildClassName(
    STYLES.header.base,
    isCollapsed ? STYLES.header.collapsed : STYLES.header.expanded
  );

  return (
    <header className={headerClassName}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">BE</span>
        </div>
        {!isCollapsed && ( 
          <h1 className={STYLES.logo.title}>
            INVENTÁRIO BELLE ÉPOQUE
          </h1>
        )}
      </div>
    </header>
  );
});

SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.memo<{ isCollapsed: boolean }>(({ 
  isCollapsed 
}) => (
  <footer 
    className={buildClassName(
      STYLES.footer.base,
      isCollapsed && "opacity-0 pointer-events-none" 
    )}
  >
    <p className={STYLES.footer.text}>
      &copy; 2025 Belle Époque
    </p>
  </footer>
));

SidebarFooter.displayName = "SidebarFooter";

const NavigationLinks = React.memo<{ isCollapsed: boolean }>(({ 
  isCollapsed 
}) => (
  <nav 
    className="flex-grow mt-8" 
    role="navigation" 
    aria-label="Navegação principal"
  >
    {NAVIGATION_ITEMS.map((item) => (
      <SidebarLink
        key={item.id}
        href={item.href}
        icon={item.icon}
        label={item.label}
        isCollapsed={isCollapsed}
      />
    ))}
  </nav>
));

NavigationLinks.displayName = "NavigationLinks";

// ===== MAIN COMPONENT =====
const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const sidebarClassName = buildClassName(
    STYLES.sidebar.base,
    isSidebarCollapsed ? STYLES.sidebar.collapsed : STYLES.sidebar.expanded
  );

  return (
    <aside className={sidebarClassName}>
      <SidebarHeader 
        isCollapsed={isSidebarCollapsed} 
      />
      
      <NavigationLinks isCollapsed={isSidebarCollapsed} />
      
      <SidebarFooter isCollapsed={isSidebarCollapsed} />
    </aside>
  );
};

export default Sidebar;
