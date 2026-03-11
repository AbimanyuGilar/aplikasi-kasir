import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"
import { Store, House, PackageSearch, ClipboardClock } from "lucide-react";

export function AppSidebar() {
  const location = useLocation();

  const menu = [
    {
      icon: <House />,
      text: "Beranda",
      path: "/"
    },
    {
      icon: <PackageSearch />,
      text: "Produk",
      path: "/products"
    },
    {
      icon: <ClipboardClock />,
      text: "Riwayat",
      path: "/history"
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className={`text-xl font-bold flex flex-row`}>
        <Store /> 
        <span>Aplikasi Kasir</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {menu.map((item, index) => (
          <SidebarMenu key={index}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                <Link to={item.path}>{item.icon ?? ""}{item.text}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>  
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}