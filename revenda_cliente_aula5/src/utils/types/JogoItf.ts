export interface JogoItf {
  id: number
  titulo: string
  capa: string
  preco: number
  anoLancamento: number
  genero: string // ✅ aqui!
  descricao?: string
  destaque: boolean
  estudio: {
    id: number
    nome: string
  }
  imagens: {
    id: number
    url: string
    legenda: string
  }[]
}
