import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Home = () => {
  const navigate = useNavigate()

  return (
    <Fragment>
      {/* <head> 标签的内容在 <Helmet> 标签中定义 这样就可以在服务端代码中获取到 */}
      <Helmet>
        <title>简易的服务端渲染 -- HOME</title>
        <meta name="description" content="服务端渲染 -- DEMO"></meta>
      </Helmet>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <h1>hello-ssr</h1>
        <button
          onClick={(): void => {
            alert('hello-ssr')
          }}
        >
          alert
        </button>

        {/* 点击链接跳转 -- 触发服务端路由渲染 */}
        <a href="/demo">点击链接跳转 -- 触发服务端路由渲染</a>

        {/* 使用 navigate 跳转 -- 触发客户端路由渲染 */}
        <button
          onClick={(): void => {
            navigate('/demo')
          }}
        >
          使用 navigate 跳转 -- 触发客户端路由渲染
        </button>
      </div>
    </Fragment>
  )
}

export default Home
