"use client";

import {
  PackageSearch,
  FilePlus2,
  Package,
  MapPin,
  MessageSquare,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

// Menu items WITHOUT locale prefix
const rawItems = [
  { title: "Dashboard", path: "dashboard", icon: LayoutDashboard },
  { title: "Products", path: "dashboard/products", icon: PackageSearch },
  { title: "Post Blog", path: "dashboard/blog", icon: FilePlus2 },
  { title: "Orders", path: "dashboard/orders", icon: Package },
  { title: "Track", path: "dashboard/track", icon: MapPin },
  { title: "Queries", path: "dashboard/queries", icon: MessageSquare },
  { title: "Account", path: "dashboard/account", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const locale = useLocale();
  const { toggleSidebar } = useSidebar();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  function toggleSideBarOnMobile() {
    if (isMobile) {
      toggleSidebar();
    }
  }
  // Build menu with locale-prefixed URLs
  const items = rawItems.map((item) => ({
    ...item,
    url: `/${locale}/${item.path}`,
  }));

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>SiRa</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive =
                  pathname === item.url ||
                  (item.path !== "dashboard" &&
                    pathname.startsWith(item.url + "/"));

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        onClick={toggleSideBarOnMobile}
                        href={item.url}
                        className={`flex items-center gap-2 transition-all 
                          hover:scale-[1.02] hover:bg-gray-100 
                          ${
                            isActive
                              ? "bg-gray-200 font-semibold border-l-4 border-blue-600 text-blue-600"
                              : ""
                          }
                        `}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
