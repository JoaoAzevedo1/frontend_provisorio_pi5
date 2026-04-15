import { useState } from 'react' // 1. Adicionado import do useState
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem
} from '@mui/material'

import Header from '../components/Header'
import { emitirRelatorioFrequencia } from '../reports/FrequenciaReport'
import { emitirRelatorioNotas } from '../reports/NotasReport'
import { emitirConsultaAluno } from '../reports/ConsultaAlunoReport'
import { emitirHistoricoEscolar } from '../reports/HistoricoEscolarReport'

// 2. Adicionado a propriedade "ano" aos dados mockados para o filtro funcionar
const relatorios = [
  {
    nome: 'Relatório de Notas',
    tipo: 'Acadêmico',
    descricao: 'Exibe as notas dos alunos por disciplina',
    ano: '2026'
  },
  {
    nome: 'Relatório de Frequência',
    tipo: 'Acadêmico',
    descricao: 'Mostra presença e faltas dos alunos',
    ano: '2026'
  },
  {
    nome: 'Consulta de Alunos',
    tipo: 'Consulta',
    descricao: 'Busca dados cadastrais dos alunos',
    ano: '2025' // Colocado em 2025 para teste de filtro
  },
  {
    nome: 'Histórico Escolar',
    tipo: 'Acadêmico',
    descricao: 'Lista todo histórico acadêmico do aluno',
    ano: '2026'
  }
]

export default function Dashboard() {
  // 3. Criando os Estados para guardar o que o usuário digita/seleciona
  const [busca, setBusca] = useState('')
  const [anoFiltro, setAnoFiltro] = useState('todos')
  const [tipoFiltro, setTipoFiltro] = useState('todos')

  // 4. Lógica de Filtragem: cruza a lista com os estados atuais
  const relatoriosFiltrados = relatorios.filter((item) => {
    const textoBusca = busca.toLowerCase()
    const matchBusca = 
      item.nome.toLowerCase().includes(textoBusca) || 
      item.descricao.toLowerCase().includes(textoBusca)
      
    const matchAno = anoFiltro === 'todos' || item.ano === anoFiltro
    const matchTipo = tipoFiltro === 'todos' || item.tipo.toLowerCase() === tipoFiltro

    return matchBusca && matchAno && matchTipo
  })

  return (
    <Box>
      <Header />

      <Box sx={{ p: 4, maxWidth: '1000px', margin: '0 auto' }}>
        
        <Typography variant="h5" sx={{ mb: 3 }}>
          Relatórios e Consultas
        </Typography>

        {/* BUSCA COM EVENTO ONCHANGE */}
        <TextField
          label="Buscar relatório (ex: Notas, Aluno)..."
          fullWidth
          sx={{ mb: 3 }}
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        {/* FILTROS COM EVENTO ONCHANGE */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            select
            label="Ano"
            value={anoFiltro}
            onChange={(e) => setAnoFiltro(e.target.value)}
            sx={{ width: 150 }}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="2026">2026</MenuItem>
            <MenuItem value="2025">2025</MenuItem>
          </TextField>

          <TextField
            select
            label="Tipo"
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
            sx={{ width: 200 }}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="acadêmico">Acadêmico</MenuItem>
            <MenuItem value="consulta">Consulta</MenuItem>
          </TextField>
        </Box>

        {/* RENDERIZANDO A LISTA FILTRADA E MENSAGEM VAZIA */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {relatoriosFiltrados.length > 0 ? (
            relatoriosFiltrados.map((item, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box>
                  <Typography variant="h6">{item.nome}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.descricao}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Tipo: {item.tipo} | Ano: {item.ano}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  onClick={() => {
                    switch (item.nome) {
                      case 'Relatório de Frequência':
                        emitirRelatorioFrequencia()
                        break
                      case 'Relatório de Notas':
                        emitirRelatorioNotas()
                        break
                      case 'Consulta de Alunos':
                        emitirConsultaAluno()
                        break
                      case 'Histórico Escolar':
                        emitirHistoricoEscolar()
                        break
                      default:
                        alert('Relatório em desenvolvimento: em breve estará disponível.')
                    }
                  }}
                >
                  Emitir
                </Button>
              </Paper>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
              Nenhum relatório encontrado para os filtros selecionados.
            </Typography>
          )}
        </Box>

      </Box>
    </Box>
  )
}
