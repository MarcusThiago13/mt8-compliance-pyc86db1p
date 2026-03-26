import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from './AppSidebar'
import { Header } from './Header'
import { TenantProvider } from '@/contexts/TenantContext'

export default function Layout() {
  return (
    <TenantProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col min-h-screen bg-muted/20">
          <Header />
          <main className="flex-1 p-6 max-w-7xl mx-auto w-full animate-fade-in-up">
            <Outlet />
          </main>
          <footer className="py-4 text-center text-xs text-muted-foreground border-t mt-auto">
            <div className="flex justify-center gap-4">
              <a href="#" className="hover:underline">
                Política de Privacidade
              </a>
              <a href="#" className="hover:underline">
                Termos de Uso
              </a>
              <span>•</span>
              <span>Timestamp Seguro: {new Date().toISOString()}</span>
            </div>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </TenantProvider>
  )
}
