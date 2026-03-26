import { useLocation } from 'react-router-dom'
import { Search, User } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useTenant } from '@/contexts/TenantContext'

export function Header() {
  const { tenant } = useTenant()
  const location = useLocation()

  const getPageName = () => {
    if (location.pathname === '/') return 'Dashboard'
    if (location.pathname === '/settings') return 'Configurações'
    if (location.pathname === '/logs') return 'Logs & Privacidade'
    if (location.pathname.startsWith('/track/')) return 'Trilha de Compliance'
    if (location.pathname.startsWith('/admin/novo-cliente')) return 'Novo Cliente'
    if (location.pathname.startsWith('/admin/clientes/')) return 'Editar Cliente'
    if (location.pathname === '/admin') return 'Portal Super Admin'
    return 'Página'
  }

  const badgeColor = tenant
    ? {
        private: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
        osc: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
        public: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100',
      }[tenant.nature]
    : ''

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="hidden md:block">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">mt8 Compliance</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{getPageName()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden w-64 md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="w-full bg-muted/50 pl-9 border-none focus-visible:ring-1"
          />
        </div>

        {!location.pathname.startsWith('/admin') &&
          (tenant ? (
            <Badge variant="secondary" className={badgeColor}>
              {tenant.name}
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted">
              Nenhum cliente
            </Badge>
          ))}

        <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent transition-all hover:ring-primary">
          <AvatarImage
            src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1"
            alt="User"
          />
          <AvatarFallback>
            <User size={14} />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
