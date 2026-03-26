import { Link, useLocation } from 'react-router-dom'
import {
  ShieldCheck,
  LayoutDashboard,
  FileText,
  Settings,
  Activity,
  Building,
  GraduationCap,
  Building2,
  HeartPulse,
  Users,
  Globe,
  Leaf,
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
import { TenantSwitcher } from './TenantSwitcher'

const TRACK_LABELS: Record<string, { label: string; icon: any }> = {
  'iso-core': { label: 'ISO Core 37001/37301', icon: ShieldCheck },
  'osc-track': { label: 'Módulo OSC', icon: Building },
  'public-contracts': { label: 'Contratos Públicos', icon: Building2 },
  'lgpd-education': { label: 'LGPD Escolar', icon: GraduationCap },
  'health-track': { label: 'Trilha Saúde', icon: HeartPulse },
  'social-track': { label: 'Assistência Social', icon: Users },
  'culture-track': { label: 'Cultura', icon: Globe },
  'environment-track': { label: 'Meio Ambiente', icon: Leaf },
}

export function AppSidebar() {
  const { activeTracks, isSuperAdmin } = useTenant()
  const location = useLocation()

  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        {isSuperAdmin ? (
          <TenantSwitcher />
        ) : (
          <div className="flex items-center gap-2 font-bold text-lg text-sidebar-primary-foreground py-2">
            <ShieldCheck className="text-primary size-6" />
            <span>mt8 Compliance</span>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        {isAdminRoute ? (
          <SidebarGroup>
            <SidebarGroupLabel>Administração Central</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === '/admin'}>
                    <Link to="/admin">
                      <Building2 />
                      <span>Gestão de Tenants</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === '/admin/novo-cliente'}>
                    <Link to="/admin/novo-cliente">
                      <ShieldCheck />
                      <span>Onboarding</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <>
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
                    const TrackInfo = TRACK_LABELS[track]
                    if (!TrackInfo) return null
                    const TrackIcon = TrackInfo.icon
                    return (
                      <SidebarMenuItem key={track}>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === `/track/${track}`}
                        >
                          <Link to={`/track/${track}`}>
                            <TrackIcon />
                            <span>{TrackInfo.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-auto">
              <SidebarGroupLabel>Administração Local</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname === '/perfil'}>
                      <Link to="/perfil">
                        <Building />
                        <span>Perfil da Organização</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
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
          </>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
