'use client'
import { useState } from 'react'
import { useCliente } from '@/context/ClienteContext'
import { toast } from 'sonner'

type Props = {
  jogoId: number
}

export function InteracaoFormulario({ jogoId }: Props) {
  const { cliente } = useCliente()
  const [comentario, setComentario] = useState('')
  const [nota, setNota] = useState<number>(0)
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!cliente) {
      toast.warning('Você precisa estar logado para interagir.')
      return
    }

    if (comentario.trim().length < 2) {
      toast.error('Comentário muito curto.')
      return
    }

    setCarregando(true)
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/interacoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
  mensagem: comentario,
  nota,
  clienteId: cliente.id,
  jogoId
})

    })

    setCarregando(false)

    if (res.ok) {
      toast.success('Interação enviada com sucesso!')
      setComentario('')
      setNota(0)
    } else {
      toast.error('Erro ao enviar interação.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow max-w-xl mx-auto mt-8 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Deixe seu comentário</h2>

      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Escreva sua opinião sobre este jogo..."
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white resize-none min-h-[100px]"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nota (0 a 5)
        </label>
        <input
          type="number"
          value={nota}
          onChange={(e) => setNota(Number(e.target.value))}
          min={0}
          max={5}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={carregando}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition disabled:opacity-50"
      >
        {carregando ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}
