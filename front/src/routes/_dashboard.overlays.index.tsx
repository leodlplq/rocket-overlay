import { getConfigurations } from '#/api/queries/configuration'
import { AuthContext } from '#/context/AuthProvider'
import { CreateOverlayModal } from '#components/modal/CreateOverlayModal.js'
import { ConfigLink } from '#components/overlays/ConfigLink.js'
import { Configuration } from '#types/configuration.js'
import { AuthContextType } from '#types/user.js'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Plus } from 'iconoir-react'
import { useContext, useState } from 'react'

function getConfigurationsOptions(token: string | undefined) {
  return queryOptions<Configuration[]>({
    queryKey: ['getConfigurations'],
    queryFn: () => getConfigurations(token || ''),
    retry: false,
  })
}

export const Route = createFileRoute('/_dashboard/overlays/')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      console.log('redirect')
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: () => <Overlays />,
})

const Overlays = () => {
  const { user } = useContext(AuthContext) as AuthContextType
  const [open, setOpen] = useState<boolean>(false)
  const { data } = useQuery(getConfigurationsOptions(user?.token))

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Mes overlays</h1>
      <div className="grid gap-2">
        {data ? (
          data.map((configuration) => (
            <ConfigLink
              configuration={configuration}
              key={configuration.uuid}
            />
          ))
        ) : (
          <span>loading</span>
        )}
      </div>
      <div
        className="w-full hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors cursor-pointer rounded p-4 flex items-center justify-center flex-col mt-2"
        onClick={() => setOpen(true)}>
        <Plus />
        <span className="text-xs">Ajouter un overlay</span>
      </div>
      <CreateOverlayModal open={open} setOpen={setOpen} />
    </>
  )
}
