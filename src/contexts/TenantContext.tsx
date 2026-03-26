import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react'

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
  addTenant: (tenant: Omit<TenantState, 'id'>) => void
  updateTenant: (id: string, updates: Partial<TenantState>) => void
  getActiveTracksFor: (tenant: Partial<TenantState>) => Track[]
}

const defaultTenants: TenantState[] = []

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

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenants, setTenants] = useState<TenantState[]>(defaultTenants)
  const [currentTenantId, setCurrentTenantId] = useState<string | null>(null)

  // Set to true to satisfy the super admin requirement logic locally
  const isSuperAdmin = true

  const tenant = useMemo(
    () => tenants.find((t) => t.id === currentTenantId) || tenants[0] || null,
    [tenants, currentTenantId],
  )

  const activeTracks = useMemo<Track[]>(() => getActiveTracks(tenant), [tenant])

  const switchTenant = (id: string) => setCurrentTenantId(id)

  const addTenant = (newTenant: Omit<TenantState, 'id'>) => {
    const id = `t-${Math.random().toString(36).substr(2, 9)}`
    setTenants((prev) => [...prev, { ...newTenant, id }])
    setCurrentTenantId(id)
  }

  const updateTenant = (id: string, updates: Partial<TenantState>) => {
    setTenants((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  return React.createElement(
    TenantContext.Provider,
    {
      value: {
        tenant,
        tenants,
        activeTracks,
        isSuperAdmin,
        switchTenant,
        addTenant,
        updateTenant,
        getActiveTracksFor: getActiveTracks,
      },
    },
    children,
  )
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider')
  }
  return context
}
