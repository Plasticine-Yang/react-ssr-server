import axios from 'axios'
import { FC, Fragment, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

const Demo: FC = () => {
  const [content, setContent] = useState('')

  useEffect(() => {
    axios
      .post('api/get-demo-data', {
        content: 'demo页面的内容',
      })
      .then(res => {
        setContent(res.data?.data?.content)
      })
  }, [])

  return (
    <Fragment>
      <Helmet>
        <title>简易的服务端渲染 -- DEMO</title>
        <meta name="description" content="服务端渲染 -- HOME"></meta>
      </Helmet>

      <div>{content}</div>
    </Fragment>
  )
}

export default Demo
