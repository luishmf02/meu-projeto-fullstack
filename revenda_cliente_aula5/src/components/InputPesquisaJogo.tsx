import { JogoItf } from "@/utils/types/JogoItf"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Inputs = {
  termo: string
}

type InputPesquisaProps = {
  setJogos: React.Dispatch<React.SetStateAction<JogoItf[]>>
}

export function InputPesquisa({ setJogos }: InputPesquisaProps) {
  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()

  async function enviaPesquisa(data: Inputs) {
    if (data.termo.length < 2) {
      toast.error("Informe, no mínimo, 2 caracteres")
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/jogos/pesquisa/${data.termo}`)
      const dados = await response.json()

      if (!Array.isArray(dados)) {
        toast.error("Erro inesperado na resposta da API")
        setJogos([])
        return
      }

      if (dados.length === 0) {
        toast.error("Nenhum jogo encontrado com o termo informado")
        setJogos([]) // garante que a lista fique vazia
        return
      }

      setJogos(dados)
    } catch (error) {
      toast.error("Erro ao buscar jogos")
      setJogos([]) // fallback de segurança
    }
  }

  async function mostraDestaques() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/jogos`)
      const dados = await response.json()

      if (Array.isArray(dados)) {
        reset({ termo: "" })
        setJogos(dados)
      } else {
        toast.error("Erro ao carregar destaques")
      }
    } catch (error) {
      toast.error("Erro ao buscar jogos em destaque")
    }
  }

  return (
    <div className="flex mx-auto max-w-5xl mt-3">
      <form className="flex-1" onSubmit={handleSubmit(enviaPesquisa)}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Buscar
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Título, estúdio, gênero ou preço máximo"
            {...register("termo")}
          />
          <button
            type="submit"
            className="cursor-pointer text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Pesquisar
          </button>
        </div>
      </form>
      <button
        type="button"
        className="cursor-pointer ms-3 mt-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        onClick={mostraDestaques}
      >
        Exibir Destaques
      </button>
    </div>
  )
}
