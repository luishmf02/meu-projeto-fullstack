'use client'
import { useState } from 'react'
import { useCliente } from '@/context/ClienteContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useCliente()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setCarregando(true)

    const sucesso = await login(email, senha)
    setCarregando(false)

    if (sucesso) {
      toast.success('Login realizado com sucesso!')
      router.push('/')
    } else {
      toast.error('E-mail ou senha inválidos.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Login</h1>

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 rounded-md border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
        className="w-full p-3 rounded-md border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />

      <button
        type="submit"
        disabled={carregando}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
      >
        {carregando ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
