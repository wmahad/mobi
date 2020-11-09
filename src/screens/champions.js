import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useFetchChampions} from '../utils/hooks'
import {LoadingSpinner} from '../components/LoadingSpinner'

export default function Champions() {
  const {standings, isLoading} = useFetchChampions()
  if (isLoading) return <LoadingSpinner />

  return standings.map(standing => {
    const {season, round, DriverStandings} = standing

    const {points, wins, Driver} = DriverStandings[0]
    return (
      <Card key={season}>
        <Card.Body>
          <Card.Title className="heading">
            <>
              {season} - {`${Driver.givenName} ${Driver.familyName}`}
            </>
            <Link to={`/${season}`}>All winners</Link>
          </Card.Title>
          <div className="details">
            <div className="standings">
              <Card.Subtitle className="mb-2 text-muted">
                Standings
              </Card.Subtitle>
              <span>Points: {points}</span>
              <span>Wins: {wins}</span>
              <span>Round: {round}</span>
            </div>

            <div className="bio">
              <Card.Subtitle className="mb-2 text-muted">Details</Card.Subtitle>
              <span>
                Birthday: {new Date(Driver.dateOfBirth).toDateString()}
              </span>
              <span>Nationality: {Driver.nationality}</span>
              <span>Race number: {Driver.permanentNumber}</span>
            </div>
          </div>
          <Card.Link href={Driver.url} target="_blank">
            Read about {Driver.givenName}
          </Card.Link>
        </Card.Body>
      </Card>
    )
  })
}
