'use client'
import { JogoItf } from "@/utils/types/JogoItf"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { InteracaoFormulario } from "@/components/InteracaoFormulario"

type Interacao = {
  id: number
  mensagem: string
  nota: number
  cliente: { nome: string }
}

export default function DetalhesJogo() {
  const params = useParams()
  const [jogo, setJogo] = useState<JogoItf>()
  const [media, setMedia] = useState<number>(0)
  const [interacoes, setInteracoes] = useState<Interacao[]>([])

  useEffect(() => {
    async function buscaDados() {
      const resJogo = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/jogos/${params.jogo_id}`)
      const dadosJogo = await resJogo.json()
      setJogo(dadosJogo)

      const resMedia = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/interacoes/media/${params.jogo_id}`)
      const dadosMedia = await resMedia.json()
      setMedia(dadosMedia.media)

      const resInteracoes = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/interacoes/jogo/${params.jogo_id}`)
      const dadosInteracoes = await resInteracoes.json()
      setInteracoes(dadosInteracoes)
    }

    buscaDados()
  }, [])

  const listaImagens = jogo?.imagens?.map(imagem => (
    <div key={imagem.id}>
      <img
        src={imagem.url}
        alt={imagem.legenda}
        title={imagem.legenda}
        className="h-52 max-w-80 rounded-lg"
      />
    </div>
  ))

  return (
    <>
      {/* Detalhes do jogo */}
      <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        {jogo?.capa && (
          <>
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
              src={jogo.capa}
              alt="Capa do Jogo"
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {jogo.titulo}
              </h5>
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
                Estúdio: {jogo.estudio.nome}
              </h5>
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
                Lançado em: {jogo.anoLancamento}
              </h5>
              <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
                Preço: R$ {Number(jogo.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {jogo.descricao}
              </p>
              <p className="font-semibold text-yellow-500 dark:text-yellow-400">
                Média de Avaliações: {media.toFixed(1)} / 5 ⭐
              </p>
            </div>
          </>
        )}
      </section>

      {/* Galeria de imagens */}
      <div className="mt-4 md:max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {listaImagens}
      </div>

      {/* Formulário de interação */}
      <InteracaoFormulario jogoId={Number(params.jogo_id)} />

      {/* Comentários */}
      <section className="mt-8 md:max-w-5xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Comentários</h2>
        {interacoes.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">Nenhum comentário ainda.</p>
        ) : (
          <div className="space-y-4">
            {interacoes.map(interacao => (
              <div key={interacao.id} className="p-4 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm">
                <p className="font-semibold text-gray-900 dark:text-white">{interacao.cliente.nome}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Nota: {interacao.nota} ⭐</p>
                <p className="text-gray-800 dark:text-gray-200 mt-2">{interacao.mensagem}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
