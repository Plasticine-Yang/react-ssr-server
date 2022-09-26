import router from '@/router'
import { clientStore } from '@/store'
import { hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Client = (): JSX.Element => {
  return (
    <Provider store={clientStore}>
      <BrowserRouter>
        <Routes>
          {router.map((item, idx) => (
            <Route {...item} key={idx} />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

hydrateRoot(document.getElementById('root') as Document | Element, <Client />)
