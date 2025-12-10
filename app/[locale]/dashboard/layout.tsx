import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full overflow-hidden">
        <SidebarTrigger />
        <div className="py-5 h-full px-5 ">{children}</div>
      </main>
    </SidebarProvider>
  );
}
