export const GENEROS = ["RPG", "AVENTURA", "ACAO", "ESTRATEGIA", "CORRIDA"] as const
export type Genero = typeof GENEROS[number]
