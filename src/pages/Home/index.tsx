import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
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
  )
}

export default Home
