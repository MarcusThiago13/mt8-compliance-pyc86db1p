import React, { createContext, useContext, useState, useMemo, ReactNode, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { AuthProvider, useAuth } from '@/hooks/use-auth'
import { Skeleton } from '@/components/ui/skeleton'

export type TenantNature = 'private' | 'osc' | 'public'
export type AccessProfile = 'A' | 'B' | 'C'
export type Track =
  | 'iso-core'
  | 'osc-track'
  | 'public-contracts'
  | 'lgpd-education'
  | 'health-track'
  | 'social-track'
  | 'culture-track'
  | 'environment-track'

export interface TenantState {
  id: string
  name: string
  nature: TenantNature
  publicRelationship: boolean
  areas: string[]
  accessProfile: AccessProfile
  isoProfileData?: Record<string, any>
}

interface TenantContextData {
  tenant: TenantState | null
  tenants: TenantState[]
  activeTracks: Track[]
  isSuperAdmin: boolean
  switchTenant: (id: string) => void
  addTenant: (tenant: Omit<TenantState, 'id'>) => Promise<void>
  updateTenant: (id: string, updates: Partial<TenantState>) => Promise<void>
  getActiveTracksFor: (tenant: Partial<TenantState>) => Track[]
}

const TenantContext = createContext<TenantContextData | undefined>(undefined)

export function getActiveTracks(tenant: Partial<TenantState> | null): Track[] {
  if (!tenant) return []
  const tracks: Track[] = ['iso-core']
  if (tenant.nature === 'osc') tracks.push('osc-track')
  if (tenant.publicRelationship || tenant.nature === 'public') tracks.push('public-contracts')
  if (tenant.areas?.includes('education')) tracks.push('lgpd-education')
  if (tenant.areas?.includes('health')) tracks.push('health-track')
  if (tenant.areas?.includes('social')) tracks.push('social-track')
  if (tenant.areas?.includes('culture')) tracks.push('culture-track')
  if (tenant.areas?.includes('environment')) tracks.push('environment-track')
  return tracks
}

function TenantProviderInner({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth()
  const [tenants, setTenants] = useState<TenantState[]>([])
  const [currentTenantId, setCurrentTenantId] = useState<string | null>(null)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadTenants() {
      if (authLoading) return
      if (!user) {
        if (mounted) setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_super_admin')
          .eq('id', user.id)
          .single()

        if (mounted) setIsSuperAdmin(!!profile?.is_super_admin)

        const { data, error } = await supabase
          .from('tenants')
          .select('*')
          .order('created_at', { ascending: true })
        if (error) throw error

        if (data && mounted) {
          const mapped: TenantState[] = data.map((t: any) => ({
            id: t.id,
            name: t.name,
            nature: (t.nature as TenantNature) || 'private',
            publicRelationship: t.public_relationship || false,
            areas: t.areas || [],
            accessProfile: (t.access_profile as AccessProfile) || 'A',
            isoProfileData: t.iso_profile_data || {},
          }))
          setTenants(mapped)

          if (mapped.length > 0) {
            // Prioritize selecting ASEC if available, otherwise the last added
            const asec = mapped.find((m) => m.name.includes('ASEC'))
            setCurrentTenantId((prev) => prev || (asec ? asec.id : mapped[mapped.length - 1].id))
          }
        }
      } catch (error) {
        console.error('Error loading tenants:', error)
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    loadTenants()

    return () => {
      mounted = false
    }
  }, [user, authLoading])

  const tenant = useMemo(
    () => tenants.find((t) => t.id === currentTenantId) || tenants[0] || null,
    [tenants, currentTenantId],
  )

  const activeTracks = useMemo<Track[]>(() => getActiveTracks(tenant), [tenant])

  const switchTenant = (id: string) => setCurrentTenantId(id)

  const addTenant = async (newTenant: Omit<TenantState, 'id'>) => {
    try {
      const payload: any = {
        name: newTenant.name,
        nature: newTenant.nature,
        public_relationship: newTenant.publicRelationship,
        areas: newTenant.areas,
        access_profile: newTenant.accessProfile,
      }

      if (newTenant.isoProfileData) {
        payload.iso_profile_data = newTenant.isoProfileData
      }

      const { data, error } = await supabase.from('tenants').insert(payload).select().single()

      if (error) throw error

      if (data) {
        const t: TenantState = {
          id: data.id,
          name: data.name,
          nature: data.nature as TenantNature,
          publicRelationship: data.public_relationship || false,
          areas: data.areas || [],
          accessProfile: (data.access_profile as AccessProfile) || 'A',
          isoProfileData: (data as any).iso_profile_data || {},
        }
        setTenants((prev) => [...prev, t])
        setCurrentTenantId(t.id)

        if (user) {
          await supabase.from('tenant_users').insert({
            tenant_id: t.id,
            user_id: user.id,
            role: 'admin',
          })
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  const updateTenant = async (id: string, updates: Partial<TenantState>) => {
    try {
      const payload: any = {}
      if (updates.name !== undefined) payload.name = updates.name
      if (updates.nature !== undefined) payload.nature = updates.nature
      if (updates.publicRelationship !== undefined)
        payload.public_relationship = updates.publicRelationship
      if (updates.areas !== undefined) payload.areas = updates.areas
      if (updates.accessProfile !== undefined) payload.access_profile = updates.accessProfile

      if (updates.isoProfileData !== undefined) {
        payload.iso_profile_data = updates.isoProfileData
      }

      const { error } = await supabase.from('tenants').update(payload).eq('id', id)

      if (!error) {
        setTenants((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
      } else {
        throw error
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (isLoading || authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="space-y-4 flex flex-col items-center">
          <Skeleton className="h-12 w-12 rounded-full" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            Sincronizando dados seguros...
          </p>
        </div>
      </div>
    )
  }

  return (
    <TenantContext.Provider
      value={{
        tenant,
        tenants,
        activeTracks,
        isSuperAdmin,
        switchTenant,
        addTenant,
        updateTenant,
        getActiveTracksFor: getActiveTracks,
      }}
    >
      {children}
    </TenantContext.Provider>
  )
}

export function TenantProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <TenantProviderInner>{children}</TenantProviderInner>
    </AuthProvider>
  )
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider')
  }
  return context
}
