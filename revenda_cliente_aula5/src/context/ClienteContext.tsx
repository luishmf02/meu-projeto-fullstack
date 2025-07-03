'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { ClienteItf } from '@/utils/types/ClienteItf'

interface ClienteContextType {
  cliente: ClienteItf | null
  login: (email: string, senha: string) => Promise<boolean>
  logout: () => void
}

const ClienteContext = createContext<ClienteContextType | undefined>(undefined)

export function ClienteProvider({ children }: { children: React.ReactNode }) {
  const [cliente, setCliente] = useState<ClienteItf | null>(null)

  useEffect(() => {
    const salvo = localStorage.getItem('cliente')
    if (salvo) setCliente(JSON.parse(salvo))
  }, [])

  async function login(email: string, senha: string) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      })

      if (!response.ok) return false

      const clienteLogado = await response.json()
      setCliente(clienteLogado)
      localStorage.setItem('cliente', JSON.stringify(clienteLogado))
      return true
    } catch {
      return false
    }
  }

  function logout() {
    setCliente(null)
    localStorage.removeItem('cliente')
  }

  return (
    <ClienteContext.Provider value={{ cliente, login, logout }}>
      {children}
    </ClienteContext.Provider>
  )
}

export function useCliente() {
  const context = useContext(ClienteContext)
  if (!context) throw new Error('useCliente precisa estar dentro do ClienteProvider')
  return context
}
