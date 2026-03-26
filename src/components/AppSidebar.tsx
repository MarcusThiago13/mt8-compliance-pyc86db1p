import { Link, useLocation } from 'react-router-dom'
import {
  ShieldCheck,
  LayoutDashboard,
  FileText,
  Settings,
  Activity,
  BookOpen,
  Building,
  GraduationCap,
  Building2,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useTenant } from '@/contexts/TenantContext'

const TRACK_LABELS: Record<string, { label: string; icon: any }> = {
  'iso-core': { label: 'ISO Core 37001/37301', icon: ShieldCheck },
  'osc-track': { label: 'Módulo OSC', icon: Building },
  'public-contracts': { label: 'Contratos Públicos', icon: Building2 },
  'lgpd-education': { label: 'LGPD Escolar', icon: GraduationCap },
}

export function AppSidebar() {
  const { activeTracks } = useTenant()
  const location = useLocation()

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-6">
        <div className="flex items-center gap-2 font-bold text-lg text-sidebar-primary-foreground">
          <ShieldCheck className="text-primary" />
          <span>mt8 Compliance</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/'}>
                  <Link to="/">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/logs'}>
                  <Link to="/logs">
                    <Activity />
                    <span>Logs & Privacidade</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/docs'}>
                  <Link to="/docs">
                    <FileText />
                    <span>Documentos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Trilhas Ativas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {activeTracks.map((track) => {
                const TrackIcon = TRACK_LABELS[track].icon
                return (
                  <SidebarMenuItem key={track}>
                    <SidebarMenuButton asChild isActive={location.pathname === `/track/${track}`}>
                      <Link to={`/track/${track}`}>
                        <TrackIcon />
                        <span>{TRACK_LABELS[track].label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/settings'}>
                  <Link to="/settings">
                    <Settings />
                    <span>Configurações do Tenant</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
