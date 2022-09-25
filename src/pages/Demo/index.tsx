import { FC, Fragment } from 'react'
import { Helmet } from 'react-helmet'

const Demo: FC = () => {
  return (
    <Fragment>
      <Helmet>
        <title>简易的服务端渲染 -- DEMO</title>
        <meta name="description" content="服务端渲染 -- HOME"></meta>
      </Helmet>

      <div>这是一个Demo页面</div>
    </Fragment>
  )
}

export default Demo
