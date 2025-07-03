'use client'
import { useEffect, useState } from "react"
import { GENEROS, Genero } from "@/utils/constants/generos"
import { EstudioItf } from "@/utils/types/EstudioItf"
import { JogoItf } from "@/utils/types/JogoItf"
import { ChevronDown, ChevronUp } from "lucide-react"

type Props = {
  setJogos: React.Dispatch<React.SetStateAction<JogoItf[]>>
}

export function FiltroJogo({ setJogos }: Props) {
  const [generosSelecionados, setGenerosSelecionados] = useState<Genero[]>([])
  const [precoMax, setPrecoMax] = useState("")
  const [estudios, setEstudios] = useState<EstudioItf[]>([])
  const [estudioId, setEstudioId] = useState<number | "">("")
  const [mostrarFiltros, setMostrarFiltros] = useState(true)

  useEffect(() => {
    async function carregarEstudios() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/estudios`)
      const data = await response.json()
      setEstudios(data)
    }
    carregarEstudios()
  }, [])

  useEffect(() => {
    async function buscarFiltrados() {
      const filtros = {
        generos: generosSelecionados,
        precoMax: precoMax ? Number(precoMax) : undefined,
        estudioId: estudioId || undefined
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/jogos/filtro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filtros)
      })

      const dados = await response.json()
      setJogos(dados)
    }

    buscarFiltrados()
  }, [generosSelecionados, precoMax, estudioId])

  function toggleGenero(genero: Genero) {
    setGenerosSelecionados(prev =>
      prev.includes(genero) ? prev.filter(g => g !== genero) : [...prev, genero]
    )
  }

  function limparFiltros() {
    setGenerosSelecionados([])
    setPrecoMax("")
    setEstudioId("")
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl p-4 mx-auto mt-4 max-w-5xl shadow-sm">
      <button
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold mb-3"
      >
        {mostrarFiltros ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        {mostrarFiltros ? 'Esconder Filtros' : 'Mostrar Filtros'}
      </button>

      {mostrarFiltros && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Gênero
            </h2>
            <div className="flex flex-wrap gap-3">
              {GENEROS.map((genero) => (
                <label key={genero} className="flex items-center gap-2 bg-white dark:bg-gray-700 px-3 py-1.5 rounded-md shadow-sm hover:shadow-md transition cursor-pointer">
                  <input
                    type="checkbox"
                    checked={generosSelecionados.includes(genero)}
                    onChange={() => toggleGenero(genero)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
                  />
                  <span className="text-sm text-gray-800 dark:text-gray-100">
                    {genero}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col w-full sm:w-1/2">
              <label className="text-gray-700 dark:text-gray-200 text-sm mb-1">
                Preço Máximo (R$)
              </label>
              <input
                type="number"
                value={precoMax}
                onChange={(e) => setPrecoMax(e.target.value)}
                placeholder="ex: 200"
                className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex flex-col w-full sm:w-1/2">
              <label className="text-gray-700 dark:text-gray-200 text-sm mb-1">
                Estúdio
              </label>
              <select
                value={estudioId}
                onChange={(e) => setEstudioId(e.target.value ? Number(e.target.value) : "")}
                className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Todos</option>
                {estudios.map(est => (
                  <option key={est.id} value={est.id}>
                    {est.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={limparFiltros}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 rounded-md shadow-sm transition"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  )
}