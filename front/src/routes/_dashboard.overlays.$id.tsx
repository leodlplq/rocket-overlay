import { getConfiguration } from '#/api/queries/configuration'
import { AuthContext } from '#/context/AuthProvider'
import { UpdateConfigurationForm } from '#components/forms/UpdateConfigurationForm.js'
import { Configuration } from '#types/configuration.js'
import { AuthContextType } from '#types/user.js'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect, useParams } from '@tanstack/react-router'
import { useContext } from 'react'

function getConfigurationOptions(token: string | undefined, id: string) {
  return queryOptions<Configuration | null>({
    queryKey: ['getConfiguration', id],
    queryFn: () => getConfiguration(token || '', id),
  })
}

export const Route = createFileRoute('/_dashboard/overlays/$id')({
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
  component: () => <ConfigurationPage />,
})

const ConfigurationPage = () => {
  const { user } = useContext(AuthContext) as AuthContextType
  const { id } = useParams({ from: '/_dashboard/overlays/$id' })
  const { data } = useQuery(getConfigurationOptions(user?.token, id))

  return (
    <div>
      {data ? (
        <>
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <UpdateConfigurationForm data={data} />
        </>
      ) : (
        <span>loading</span>
      )}
    </div>
  )
}
