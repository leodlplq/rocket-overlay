import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_default/')({
  component: () => <div>Page d'accueil</div>,
})
