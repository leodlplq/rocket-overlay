import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index
})

function Index() {
  return <div>Faire la page d'accueil</div>
}
