import { FC, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { getDemoData } from './store/demoReducer'

interface IProps {
  content?: string
  getDemoData?: (data: string) => void
}

const Demo: FC<IProps> = props => {
  return (
    <Fragment>
      <Helmet>
        <title>简易的服务端渲染 -- DEMO</title>
        <meta name="description" content="服务端渲染 -- HOME"></meta>
      </Helmet>

      <div>
        <h1>{props.content}</h1>
        <button
          onClick={(): void => {
            props.getDemoData && props.getDemoData('刷新过后的数据')
          }}
        >
          刷新
        </button>
      </div>
    </Fragment>
  )
}

// 将 demoStore 的 state 和异步请求方法注入到 Demo 组件中
// 通过 mapStateToProps 将 state 注入到 Demo 组件的 Props 中
// 通过 mapDispatchToProps 将异步请求方法注入到 Demo 组件的 Props 中
const mapStateToProps = (state: any) => {
  return {
    content: state?.demo?.content,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDemoData: (data: string) => {
      dispatch(getDemoData(data))
    },
  }
}

const storeDemo: any = connect(mapStateToProps, mapDispatchToProps)(Demo)

storeDemo.getInitProps = (store: any, data?: string) => {
  return store.dispatch(getDemoData(data || '这是初始化的数据'))
}

export default storeDemo
