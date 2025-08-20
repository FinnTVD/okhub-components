import {
  Home,
  Inbox,
  Table,
  Navigation,
  Upload,
  Sparkles,
  FolderInput,
  FolderCode,
  Map,
  ScrollIcon,
  AlignVerticalDistributeCenter,
  GalleryHorizontal,
  ArrowUp10,
  LoaderCircle,
} from "lucide-react";
import Link from "next/link";

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
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Tab",
    url: "/tab",
    icon: Table,
  },
  {
    title: "Social",
    url: "/social",
    icon: Inbox,
  },
  {
    title: "Counter",
    url: "/counter",
    icon: ArrowUp10,
  },
  {
    title: "Navbar",
    url: "/navbar",
    icon: Navigation,
  },
  {
    title: "File Upload",
    url: "/file-upload",
    icon: Upload,
  },
  {
    title: "Animated Content",
    url: "/animated-content",
    icon: Sparkles,
  },
  {
    title: "Form",
    url: "/form",
    icon: FolderInput,
  },
  {
    title: "Slider",
    url: "/slider",
    icon: GalleryHorizontal,
  },
  {
    title: "Form Builder",
    url: "/form-builder",
    icon: FolderCode,
  },
  {
    title: "Text animation",
    url: "/text-animation",
    icon: Sparkles,
  },
  {
    title: "Interactive Map",
    url: "/leaflet-map",
    icon: Map,
  },
  {
    title: "Scroll",
    url: "/scroll",
    icon: ScrollIcon,
  },
  {
    title: "Clip Path",
    url: "/clip-path",
    icon: Sparkles,
  },
  {
    title: "Marquee",
    url: "/marquee",
    icon: AlignVerticalDistributeCenter,
  },
  {
    title: "Spinning",
    url: "/spinning",
    icon: LoaderCircle,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Components Manager</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
