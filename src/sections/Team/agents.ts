import finStill from '@/assets/team/fin-still.jpg'
import fin from '@/assets/team/fin.mp4'
import juriStill from '@/assets/team/juri-still.jpg'
import juri from '@/assets/team/juri.mp4'
import makyStill from '@/assets/team/maky-still.jpg'
import maky from '@/assets/team/maky.mp4'
import opyStill from '@/assets/team/opy-still.jpg'
import opy from '@/assets/team/opy.mp4'
import pipoStill from '@/assets/team/pipo-still.jpg'
import pipo from '@/assets/team/pipo.mp4'
import wazStill from '@/assets/team/waz-still.jpg'
import waz from '@/assets/team/waz.mp4'

export type Agent = {
  name: string
  role: string
  description: string
  tools: string[]
  /* vídeo do personagem (5s, loop) recortado em quadrado */
  video: string
  /* quadro "congelado" mostrado fora de destaque, e o instante dele no vídeo */
  still: string
  stillAt: number
}

/* Figma: "Agent cards · 6" (112:94). A ordem é a do carrossel. */
export const AGENTS: Agent[] = [
  {
    name: 'Waz',
    video: waz,
    still: wazStill,
    stillAt: 4.75,
    role: 'Vendas e atendimento',
    description: 'Transforma conversas em contratos. Prospecta, negocia e atende seus clientes 24/7.',
    tools: ['Outbound WhatsApp', 'SDR', 'Gerador de propostas', 'CRM', 'Coach de Vendas', 'Busca de leads'],
  },
  {
    name: 'Maky',
    video: maky,
    still: makyStill,
    stillAt: 2,
    role: 'Marketing',
    description: 'Sua estrategista de marketing. Cria conteúdo, entende o mercado e mantém sua marca sempre presente.',
    tools: ['Análise de concorrentes', 'Blog / AEO', 'Campanhas', 'Comentários', 'Tráfego pago'],
  },
  {
    name: 'Opy',
    video: opy,
    still: opyStill,
    stillAt: 4.9,
    role: 'Operações',
    description: 'Faz a operação girar. Organiza escalas e garante que nada saia do lugar.',
    tools: ['Escalas', 'Otimizador de entregas', 'Gravações de reuniões', 'Controle de estoque'],
  },
  {
    name: 'Juri',
    video: juri,
    still: juriStill,
    stillAt: 3,
    role: 'Jurídico',
    description: 'Seu departamento jurídico sempre de plantão. Revisa, organiza e acompanha todos os seus contratos.',
    tools: ['Gestão de contratos', 'Assinatura digital', 'Gerador de documentos', 'Revisão de contratos'],
  },
  {
    name: 'Fin',
    video: fin,
    still: finStill,
    stillAt: 3,
    role: 'Finanças',
    description: 'Mantém suas contas em ordem. Acompanha entradas, saídas e a saúde financeira do seu negócio.',
    tools: ['Fluxo de caixa', 'Emissão de NF', 'Links de pagamento', 'Cobrança de cliente'],
  },
  {
    name: 'Pipo',
    video: pipo,
    still: pipoStill,
    stillAt: 4.4,
    role: 'Recursos humanos',
    description: 'Cuida do seu time de ponta a ponta. Recruta talentos e organiza o conhecimento da empresa.',
    tools: ['Triagem de CVs', 'Wiki interno', 'PDI', 'Prospecção de candidatos'],
  },
]
