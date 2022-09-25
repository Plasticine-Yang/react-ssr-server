import router from '@/router'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Client = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        {router.map((item, idx) => (
          <Route {...item} key={idx} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

hydrateRoot(document.getElementById('root') as Document | Element, <Client />)
