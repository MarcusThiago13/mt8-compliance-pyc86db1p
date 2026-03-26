import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react'

export type TenantNature = 'private' | 'osc' | 'public'
export type Track = 'iso-core' | 'osc-track' | 'public-contracts' | 'lgpd-education'

export interface TenantState {
  id: string
  name: string
  nature: TenantNature
  publicRelationship: boolean
  areas: string[]
}

interface TenantContextData {
  tenant: TenantState
  activeTracks: Track[]
  updateTenant: (updates: Partial<TenantState>) => void
}

const defaultTenant: TenantState = {
  id: 't-123',
  name: 'Escola Esperança (OSC)',
  nature: 'osc',
  publicRelationship: true,
  areas: ['education'],
}

const TenantContext = createContext<TenantContextData | undefined>(undefined)

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<TenantState>(defaultTenant)

  const activeTracks = useMemo<Track[]>(() => {
    const tracks: Track[] = ['iso-core']
    if (tenant.nature === 'osc') tracks.push('osc-track')
    if (tenant.publicRelationship || tenant.nature === 'public') tracks.push('public-contracts')
    if (tenant.areas.includes('education')) tracks.push('lgpd-education')
    return tracks
  }, [tenant])

  const updateTenant = (updates: Partial<TenantState>) => {
    setTenant((prev) => ({ ...prev, ...updates }))
  }

  return React.createElement(
    TenantContext.Provider,
    { value: { tenant, activeTracks, updateTenant } },
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
