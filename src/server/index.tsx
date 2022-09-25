import childProcess from 'child_process'
import express from 'express'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Routes, Route } from 'react-router-dom'
import router from '@/router'

const app = express()

// 将项目根目录下的 client_build 作为静态资源服务器的根目录
// 这样在注入客户端脚本的时候就能通过 src="/index.js" 访问到客户端打包结果
app.use(express.static(path.resolve(process.cwd(), 'client_build')))

app.get('*', (req, resp) => {
  const content = renderToString(
    <StaticRouter location={req.path}>
      <Routes>
        {router.map((item, idx) => (
          <Route {...item} key={idx} />
        ))}
      </Routes>
    </StaticRouter>,
  )

  resp.send(`
    <html>
      <body>
        <div id="root">${content}</div>
        <script src="/index.js"></script>
      </body>
    </html>
  `)
})

app.listen(3000, () => {
  console.log('ssr-server listen on 3000')
})

childProcess.exec('start http://localhost:3000')
