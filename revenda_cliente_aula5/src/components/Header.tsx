'use client'
import Link from 'next/link'
import { useCliente } from '@/context/ClienteContext'

export function Header() {
  const { cliente, logout } = useCliente()

  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-orange-400 hover:text-orange-300">
        Loja Gamer XP
      </Link>

      <nav className="space-x-4">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/minhas_interacoes" className="hover:underline">Minhas Interações</Link>
        <Link href="/recuperar_senha" className="hover:underline">Recuperar Senha</Link>

        {cliente ? (
          <>
            <span className="ml-2 text-sm text-gray-300">Olá, {cliente.nome.split(' ')[0]}</span>
            <button onClick={logout} className="ml-4 text-red-400 hover:underline">Sair</button>
          </>
        ) : (
          <>
            <Link href="/login" className="ml-4 hover:underline">Login</Link>
            <Link href="/cadastro" className="ml-1 hover:underline">Cadastrar</Link>
          </>
        )}
      </nav>
    </header>
  )
}
