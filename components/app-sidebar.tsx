import {
  PackageSearch, // Products
  FilePlus2, // Post Blog
  Package, // Orders
  MapPin, // Track
  MessageSquare, // Queries
  Settings, // Account
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
} from "@/components/ui/sidebar";

// Menu items.
export const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: PackageSearch,
  },
  {
    title: "Post Blog",
    url: "/dashboard/blog",
    icon: FilePlus2,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: Package,
  },
  {
    title: "Track",
    url: "/dashboard/track",
    icon: MapPin,
  },
  {
    title: "Queries",
    url: "/dashboard/queries",
    icon: MessageSquare,
  },
  {
    title: "Account",
    url: "/dashboard/account",
    icon: Settings,
  },
];
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>SiRa</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
