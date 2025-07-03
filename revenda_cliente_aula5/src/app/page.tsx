'use client'
import { CardJogo } from "@/components/CardJogo"
import { InputPesquisa } from "@/components/InputPesquisaJogo"
import { JogoItf } from "@/utils/types/JogoItf"
import { FiltroJogo } from "@/components/FiltroJogo"
import { useEffect, useState } from "react"

export default function Home() {
  const [jogos, setJogos] = useState<JogoItf[]>([])

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/jogos`)
      const dados = await response.json()
      console.log(dados)
      setJogos(dados)
    }
    buscaDados()
  }, [])

  return (
    <>
      <InputPesquisa setJogos={setJogos} />
      <FiltroJogo setJogos={setJogos} />

      <div className="max-w-7xl mx-auto">
      <h1 className="mb-8 text-5xl font-bold leading-tight tracking-tight text-blue-700 dark:text-blue-400 drop-shadow-sm">
  Jogos em destaque
</h1>



        {jogos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {jogos.map(jogo => (
              <CardJogo data={jogo} key={jogo.id} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-gray-500 dark:text-gray-400 text-lg">
            Nenhum jogo encontrado com o filtro informado.
          </p>
        )}
      </div>
    </>
  )
}
