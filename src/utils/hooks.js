import {useQuery, queryCache} from 'react-query'
import {fetchChampions, fetchWinners} from './api-client'

export function useFetchChampions(config = {}) {
  const {data, ...rest} = useQuery('champions', fetchChampions, config)
  const standings = data?.MRData?.StandingsTable?.StandingsLists ?? []
  return {...rest, standings}
}

export function useFetchWinners(year) {
  const {data, ...rest} = useQuery('winners', () => fetchWinners(year))
  const races = data?.MRData?.RaceTable?.Races ?? []
  return {...rest, races}
}

export function useSeasonWinner(year) {
  const {standings, ...rest} = useFetchChampions({
    initialData: () => {
      return queryCache.getQueryData('champions')
    },
  })
  const champion =
    standings.find(d => d.season === year)?.DriverStandings[0]?.Driver ?? {}
  return {...rest, champion}
}
