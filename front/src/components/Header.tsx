import { AuthContext } from '#/context/AuthProvider'
import { AuthContextType } from '#/types/user'
import whiteLogo from '#assets/logo-white.svg'
import { Button } from '#components/catalyst/button'
import { Link } from '#components/catalyst/link'
import { useContext } from 'react'

export default function Header() {
  const { user, logout } = useContext(AuthContext) as AuthContextType

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="px-4 py-4 flex justify-between items-center">
      <Link to={'/'}>
        <img src={whiteLogo} className="h-12" />
      </Link>

      <ul>
        <li>
          <Link to={'/overlays'}>Overlays</Link>
        </li>
      </ul>

      <div>
        {user ? (
          <div className="flex gap-2">
            <Button color="lime" to={'/profile'}>
              {user.username}
            </Button>
            <Button color="zinc" onClick={handleLogout}>
              Se déconnecter
            </Button>
          </div>
        ) : (
          <Button color={'white'} to={'/login'}>
            Se connecter
          </Button>
        )}
      </div>
    </div>
  )
}
