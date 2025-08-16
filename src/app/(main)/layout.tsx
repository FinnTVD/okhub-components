import AppSidebar from "@/app/(main)/_components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import LenisProvider from "@/provider/LenisProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="relative w-full">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </LenisProvider>
  );
}
