import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full overflow-hidden">
        <SidebarTrigger />
        <div className="py-5 h-full px-5">
          <div className="mb-3">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="flex justify-center items-center gap-2 hover:bg-blue-300/25 hover:scale-[1.02]"
              >
                <ArrowLeft />
                Go Back Home
              </Button>
            </Link>
          </div>
          <div>{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
