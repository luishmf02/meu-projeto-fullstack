import { JogoItf } from "./JogoItf"

export interface FotoItf {
    id: number
    descricao: string
    carroId: number
    url: string
    carro: JogoItf
}