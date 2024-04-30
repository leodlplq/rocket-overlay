import { Configuration } from '#types/configuration.js'
import { Link } from '@tanstack/react-router'

interface IConfigLinkProps {
  configuration: Configuration
}

export const ConfigLink = ({ configuration }: IConfigLinkProps) => {
  return (
    <Link to={`/overlays/${configuration.uuid}`}>
      <div className="w-full p-4 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors cursor-pointer rounded">
        <span>{configuration.name}</span>
      </div>
    </Link>
  )
}
