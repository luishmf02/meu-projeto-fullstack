'use client'
import { useState } from 'react'
import { toast } from 'sonner'

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('')
  const [codigo, setCodigo] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [etapa, setEtapa] = useState<'solicitar' | 'alterar'>('solicitar')

  async function solicitarCodigo() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/recuperacao/solicitar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })

    if (res.ok) {
      toast.success('Código enviado para o e-mail.')
      setEtapa('alterar')
    } else {
      toast.error('Erro ao enviar código.')
    }
  }

  async function alterarSenha() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/recuperacao/alterar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, codigo, novaSenha })
    })

    if (res.ok) {
      toast.success('Senha alterada com sucesso.')
      setEtapa('solicitar')
      setEmail('')
      setCodigo('')
      setNovaSenha('')
    } else {
      toast.error('Erro ao alterar senha.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Recuperar Senha</h1>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="E-mail cadastrado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        />

        {etapa === 'alterar' && (
          <>
            <input
              type="text"
              placeholder="Código de recuperação"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />

            <input
              type="password"
              placeholder="Nova senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
          </>
        )}

        <button
          onClick={etapa === 'solicitar' ? solicitarCodigo : alterarSenha}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md font-medium transition"
        >
          {etapa === 'solicitar' ? 'Solicitar Código' : 'Alterar Senha'}
        </button>
      </div>
    </div>
  )
}
