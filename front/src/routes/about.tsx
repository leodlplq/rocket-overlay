import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getOverlays } from '../api/queries/overlay'
import { queryClient } from '../api/queryClient'
import Example from '../components/test'

const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: getOverlays,
})

export const Route = createFileRoute('/about')({
  loader: () => queryClient.ensureQueryData(postsQueryOptions),
  component: About,
})

function About() {
  const overlays = Route.useLoaderData()
  console.log(overlays)
  return (
    <div>
      <Example />
    </div>
  )
}
