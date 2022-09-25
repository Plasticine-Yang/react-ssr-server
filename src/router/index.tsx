import Demo from '@/pages/Demo'
import Home from '@/pages/Home'

interface IRouter {
  path: string
  element: JSX.Element
}

const router: Array<IRouter> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/demo',
    element: <Demo />,
  },
]

export default router
