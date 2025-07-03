'use client'
import { JogoItf } from "@/utils/types/JogoItf"
import Link from "next/link"

type Props = {
  data: JogoItf
}

export function CardJogo({ data }: Props) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg w-full h-48 object-cover" src={data.capa} alt={data.titulo} />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.titulo}
        </h5>

        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
          Gênero: {data.genero}
        </p>

        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
          Estúdio: {data.estudio?.nome}
        </p>

        <p className="mb-3 font-semibold text-gray-900 dark:text-white">
          R$ {Number(data.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
        </p>

        <Link
          href={`/detalhes/${data.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  )
}
