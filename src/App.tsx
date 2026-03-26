import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import Index from './pages/Index'
import TenantManagement from './pages/TenantManagement'
import OrganizationProfile from './pages/OrganizationProfile'
import TrackModule from './pages/TrackModule'
import LogsPrivacy from './pages/LogsPrivacy'
import Documents from './pages/Documents'
import NotFound from './pages/NotFound'
import AdminDashboard from './pages/admin/AdminDashboard'
import NewClientWizard from './pages/admin/NewClientWizard'
import ClientProfile from './pages/admin/ClientProfile'

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/settings" element={<TenantManagement />} />
          <Route path="/perfil" element={<OrganizationProfile />} />
          <Route path="/track/:trackId" element={<TrackModule />} />
          <Route path="/logs" element={<LogsPrivacy />} />
          <Route path="/docs" element={<Documents />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/novo-cliente" element={<NewClientWizard />} />
          <Route path="/admin/clientes/:id" element={<ClientProfile />} />

          {/* Catch-all route inside Layout for 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
