export function ErrorFallback({error}) {
  return (
    <div role="alert" className="fullpage error">
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}
