import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {QueryCache, ReactQueryCacheProvider} from 'react-query'
import {ErrorBoundary} from 'react-error-boundary'
import {LoadingSpinner} from './components/LoadingSpinner'
import {Header} from './components/Header'
import {ErrorFallback} from './components/ErrorFallback'
import {CHAMPIONS, WINNERS} from './routes'

const queryCache = new QueryCache()

const Champions = React.lazy(() => import('./screens/champions'))
const Winners = React.lazy(() =>
  import(/* webpackPrefetch: true */ './screens/winners'),
)

function App() {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <div className="main-wrapper">
          <Router>
            <Header />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Switch>
                <Route path={WINNERS} exact component={Winners} />
                <Route path={CHAMPIONS} component={Champions} />
              </Switch>
            </ErrorBoundary>
          </Router>
        </div>
      </ReactQueryCacheProvider>
    </React.Suspense>
  )
}

export default App
