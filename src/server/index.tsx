import Home from '@/pages/Home'
import childProcess from 'child_process'
import express from 'express'
import path from 'path'
import { renderToString } from 'react-dom/server'

const app = express()
const content = renderToString(<Home />)

// 将项目根目录下的 client_build 作为静态资源服务器的根目录
// 这样在注入客户端脚本的时候就能通过 src="/index.js" 访问到客户端打包结果
app.use(express.static(path.resolve(process.cwd(), 'client_build')))

app.get('*', (req, resp) => {
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
