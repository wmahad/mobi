import {useRouteMatch, Link} from 'react-router-dom'
import {CHAMPIONS, WINNERS} from '../routes'

export function Header() {
  const {params, path} = useRouteMatch([WINNERS, CHAMPIONS]) ?? {}
  const display =
    path === WINNERS ? `${params.year} winners` : 'World champions'
  return (
    <header className="display-4">
      <h1>
        <Link to={CHAMPIONS} className="display-4">
          F1
        </Link>
      </h1>
      <>{display}</>
    </header>
  )
}
