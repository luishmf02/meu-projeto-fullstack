"use client"
import { useCliente } from "@/context/ClienteContext"
import { useEffect, useState } from "react"

interface Interacao {
  id: number
  mensagem: string
  nota: number
  jogo: {
    titulo: string
  }
}

export default function MinhasInteracoesPage() {
  const { cliente } = useCliente()
  const [interacoes, setInteracoes] = useState<Interacao[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregar() {
      if (!cliente) return

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/interacoes/cliente/${cliente.id}`)
        const data = await response.json()
        setInteracoes(data)
      } catch (error) {
        console.error("Erro ao carregar interacoes:", error)
      } finally {
        setCarregando(false)
      }
    }

    carregar()
  }, [cliente])

  if (!cliente) {
    return <p className="text-center mt-10 text-lg text-gray-600 dark:text-gray-300">Você precisa estar logado para ver suas interações.</p>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Minhas Interações</h1>

      {carregando ? (
        <p className="text-gray-600 dark:text-gray-300">Carregando...</p>
      ) : interacoes.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Você ainda não fez nenhuma interação.</p>
      ) : (
        <div className="space-y-4">
          {interacoes.map((interacao) => (
            <div key={interacao.id} className="p-4 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm">
              <p className="font-semibold text-gray-900 dark:text-white">Jogo: {interacao.jogo.titulo}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Nota: {interacao.nota} ⭐</p>
              <p className="text-gray-800 dark:text-gray-200 mt-2">{interacao.mensagem}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}