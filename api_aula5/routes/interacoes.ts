import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import { z } from "zod"

const prisma = new PrismaClient()
const router = Router()

const interacaoSchema = z.object({
  mensagem: z.string().min(2), // <- campo correto
  nota: z.number().min(0).max(5),
  clienteId: z.number(),
  jogoId: z.number()
})

// Listar todas as interações
router.get('/', async (_req, res) => {
  try {
    const interacoes = await prisma.interacao.findMany({
      include: { cliente: true, jogo: true }
    })
    res.status(200).json(interacoes)
  } catch (error) {
    res.status(400).json({ error })
  }
})

// Listar interações de um jogo específico
router.get('/jogo/:jogoId', async (req, res) => {
  const { jogoId } = req.params
  try {
    const interacoes = await prisma.interacao.findMany({
      where: { jogoId: Number(jogoId) },
      include: { cliente: true }
    })
    res.status(200).json(interacoes)
  } catch (error) {
    res.status(400).json({ error })
  }
})

// Listar interações de um cliente específico
router.get('/cliente/:clienteId', async (req, res) => {
  const { clienteId } = req.params
  try {
    const interacoes = await prisma.interacao.findMany({
      where: { clienteId: Number(clienteId) },
      include: { jogo: true }
    })
    res.status(200).json(interacoes)
  } catch (error) {
    res.status(400).json({ error })
  }
})

// Criar uma nova interação
router.post('/', async (req, res) => {
  const valida = interacaoSchema.safeParse(req.body)
  if (!valida.success) {
    return res.status(400).json({ error: valida.error })
  }
  const { mensagem, nota, clienteId, jogoId } = valida.data
  try {
    const interacao = await prisma.interacao.create({
      data: { mensagem, nota, clienteId, jogoId }
    })
    res.status(201).json(interacao)
  } catch (error) {
    res.status(400).json({ error })
  }
})

// Calcular média de notas de um jogo
router.get('/media/:jogoId', async (req, res) => {
  const { jogoId } = req.params
  try {
    const media = await prisma.interacao.aggregate({
      where: { jogoId: Number(jogoId) },
      _avg: { nota: true }
    })
    res.status(200).json({ media: media._avg.nota ?? 0 })
  } catch (error) {
    res.status(400).json({ error })
  }
})

export default router
