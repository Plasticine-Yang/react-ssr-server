import router from '@/router'
import { serverStore } from '@/store'
import bodyParser from 'body-parser'
import childProcess from 'child_process'
import express from 'express'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { matchRoutes, Route, RouteObject, Routes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'

const app = express()

// 将项目根目录下的 client_build 作为静态资源服务器的根目录
// 这样在注入客户端脚本的时候就能通过 src="/index.js" 访问到客户端打包结果
app.use(express.static(path.resolve(process.cwd(), 'client_build')))

// 解析请求体的 body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// api: 获取 demo data
app.post('/api/get-demo-data', (req, resp) => {
  resp.send({
    code: 0,
    data: req.body,
  })
})

app.get('*', (req, resp) => {
  // 通过路由注入 state 初始数据
  const routeMap = new Map<string, () => Promise<any>>()
  router.forEach(item => {
    if (item.path && item.loadData) {
      routeMap.set(item.path, item.loadData(serverStore))
    }
  })

  // 匹配当前路由的 routes
  const matchedRoutes = matchRoutes(router as RouteObject[], req.path)

  const promises: Array<() => Promise<any>> = []
  matchedRoutes?.forEach(item => {
    if (routeMap.has(item.pathname)) {
      promises.push(routeMap.get(item.pathname)!)
    }
  })

  Promise.all(promises).then(() => {
    const content = renderToString(
      <Provider store={serverStore}>
        <StaticRouter location={req.path}>
          <Routes>
            {router.map((item, idx) => (
              <Route {...item} key={idx} />
            ))}
          </Routes>
        </StaticRouter>
      </Provider>,
    )

    const helmet = Helmet.renderStatic()

    resp.send(`
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.context = {
            state: ${JSON.stringify(serverStore.getState())}
          }
        </script>
        <script src="/index.js"></script>
      </body>
    </html>
  `)
  })
})

app.listen(3000, () => {
  console.log('ssr-server listen on 3000')
})

childProcess.exec('start http://localhost:3000')
