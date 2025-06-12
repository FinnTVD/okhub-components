import AppSidebar from "@/app/(main)/_components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
