import { createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useEffect } from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  useEffect(() => {
    // Update page title
    document.title = 'Jaime Salazar'
  }, [])

  return (
    <>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
