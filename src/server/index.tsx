import express from 'express'
import childProcess from 'child_process'

const app = express()

app.get('*', (req, resp) => {
  resp.send(`
    <html>
      <body>
        <div>hello-ssr</div>
      </body>
    </html>
  `)
})

app.listen(3000, () => {
  console.log('ssr-server listen on 3000')
})

childProcess.exec('start http://localhost:3000')
