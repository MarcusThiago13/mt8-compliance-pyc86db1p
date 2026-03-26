import { ChevronsUpDown, Check, Building, PlusCircle, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTenant } from '@/contexts/TenantContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenuButton } from '@/components/ui/sidebar'

export function TenantSwitcher() {
  const { tenant, tenants, switchTenant, isSuperAdmin } = useTenant()

  if (!isSuperAdmin) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold text-sm truncate">
              {tenant ? tenant.name : 'Nenhum cliente selecionado'}
            </span>
            <span className="text-xs text-muted-foreground truncate">Super Admin Access</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Trocar Workspace (Tenants)
        </DropdownMenuLabel>
        {tenants.length > 0 ? (
          tenants.map((t) => (
            <DropdownMenuItem
              key={t.id}
              onClick={() => switchTenant(t.id)}
              className="gap-2 cursor-pointer"
            >
              {t.id === tenant?.id ? <Check className="size-4" /> : <div className="size-4" />}
              <span className="truncate">{t.name}</span>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="px-2 py-3 text-center text-sm text-muted-foreground">
            Lista de clientes vazia
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="gap-2 cursor-pointer">
          <Link to="/admin">
            <Settings className="size-4 text-muted-foreground" />
            <span>Portal Super Admin</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="gap-2 cursor-pointer">
          <Link to="/admin/novo-cliente">
            <PlusCircle className="size-4 text-muted-foreground" />
            <span>Novo Cliente</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
