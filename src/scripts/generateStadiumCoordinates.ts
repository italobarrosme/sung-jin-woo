import { getCoordinates } from '../modules/football/leagues/services/getCoordinatesAddress'
import fs from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

type Stadium = {
  teams: string
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
}

const stadiums: Stadium[] = [
  { teams: 'Arsenal FC', address: 'Emirates Stadium' },
  { teams: 'Aston Villa FC', address: 'Villa Park' },
  { teams: 'Chelsea FC', address: 'Stamford Bridge' },
  { teams: 'Everton FC', address: 'Goodison Park' },
  { teams: 'Fulham FC', address: 'Craven Cottage' },
  { teams: 'Liverpool FC', address: 'Anfield' },
  { teams: 'Manchester City FC', address: 'Etihad Stadium' },
  { teams: 'Manchester United FC', address: 'Old Trafford' },
  { teams: 'Newcastle United FC', address: "St. James' Park" },
  { teams: 'Tottenham Hotspur FC', address: 'Tottenham Hotspur Stadium' },
  { teams: 'Wolverhampton Wanderers FC', address: 'Molineux Stadium' },
  { teams: 'Leicester City FC', address: 'King Power Stadium' },
  { teams: 'Southampton FC', address: "St. Mary's Stadium" },
  { teams: 'Ipswich Town FC', address: 'Portman Road Stadium' },
  { teams: 'Nottingham Forest FC', address: 'The City Ground' },
  { teams: 'Crystal Palace FC', address: 'Selhurst Park' },
  {
    teams: 'Brighton & Hove Albion FC',
    address: 'The American Express Community Stadium',
  },
  { teams: 'Brentford FC', address: 'Griffin Park' },
  { teams: 'West Ham United FC', address: 'London Stadium' },
  { teams: 'AFC Bournemouth', address: 'Vitality Stadium' },
]

async function generateStadiumCoordinates() {
  const stadiumsWithCoordinates = []

  for (const stadium of stadiums) {
    try {
      // Adiciona ", England" para melhorar a precisão da busca
      const coordinates = await getCoordinates(stadium.address)

      // Aguarda 1 segundo entre as requisições para evitar rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000))

      stadiumsWithCoordinates.push({
        ...stadium,
        coordinates,
      })

      console.log(`✅ Coordenadas obtidas para ${stadium.teams}`)
    } catch (error) {
      console.error(
        `❌ Erro ao obter coordenadas para ${stadium.teams}:`,
        error,
      )
      stadiumsWithCoordinates.push(stadium)
    }
  }

  // Remove duplicatas baseado no nome do time
  const uniqueStadiums = stadiumsWithCoordinates.filter(
    (stadium, index, self) =>
      index === self.findIndex((s) => s.teams === stadium.teams),
  )

  // Salva o resultado em um arquivo JSON
  const outputPath = path.join(
    process.cwd(),
    'src/data/stadiumCoordinates.json',
  )
  await fs.writeFile(
    outputPath,
    JSON.stringify(uniqueStadiums, null, 2),
    'utf-8',
  )

  console.log(`\n✨ Arquivo gerado em: ${outputPath}`)
}

// Executa o script
generateStadiumCoordinates().catch(console.error)
