'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function CadastroPage() {
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setCarregando(true)

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    })

    setCarregando(false)

    if (res.ok) {
      toast.success('Cadastro realizado com sucesso!')
      router.push('/login')
    } else {
      toast.error('Erro ao cadastrar. Verifique se o e-mail já existe.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Criar Conta</h1>
      
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        className="w-full p-3 rounded-md border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />

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
        {carregando ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  )
}
