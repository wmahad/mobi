import {useParams} from 'react-router-dom'
import {Card} from 'react-bootstrap'

import {useFetchWinners, useSeasonWinner} from '../utils/hooks'
import {LoadingSpinner} from '../components/LoadingSpinner'

export default function Winners() {
  const {year} = useParams()
  const {champion} = useSeasonWinner(year)
  const {races, isLoading} = useFetchWinners(year)

  if (isLoading) return <LoadingSpinner />

  return races.map(race => {
    const {round, raceName, url, Circuit, date, Results} = race
    const {Driver, Constructor} = Results[0]
    const championClass =
      champion.driverId === Driver.driverId ? 'champion' : ''
    return (
      <Card key={`${round}-${year}`} className={`winners ${championClass}`}>
        <Card.Body>
          <Card.Title className="heading">
            <>{`${Driver.givenName} ${Driver.familyName}`}</>
            <Card.Link href={Driver.url}>Profile</Card.Link>
          </Card.Title>
          <div>
            <span>Round:</span>
            {round}
          </div>
          <div>
            <span>Car make:</span>
            <Card.Link href={Constructor.url}>{Constructor.name}</Card.Link>
          </div>
          <div>
            <span>Race name:</span>
            <Card.Link href={url}>{raceName}</Card.Link>
          </div>
          <div>
            <span>Circuit name:</span>
            <Card.Link href={Circuit.url}>{Circuit.circuitName}</Card.Link>
          </div>
          <div>
            <span>Location:</span>
            {`${Circuit.Location.locality}, ${Circuit.Location.country}`}
          </div>

          <div>
            <span>Date:</span>
            {date}
          </div>
        </Card.Body>
      </Card>
    )
  })
}
