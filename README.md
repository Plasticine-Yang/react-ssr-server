# 运行流程

## 服务端

服务端通过`express`直接返回`html`，页面的开发使用`tsx`，并通过`react-dom/server`中的`renderToString`将`tsx`解析成`html`字符串，从而拼接到`express`接口返回的`html`中，完成服务端渲染

## 客户端

`renderToString`只负责静态的`DOM`解析，对于动态的事件绑定则并不支持，因此如果`tsx`中有事件绑定相关的逻辑时，无法正常工作，这时候就需要通过客户端来解决，可以在服务端返回的模板中注入一段`js`，将事件绑定相关的脚本放在其中，这就是客户端需要干的事

这个概念实际上有一个专有名字 -- “同构”

> “同构”，是服务器端渲染的核心概念
> 同一套 React 代码在服务器端渲染一遍，然后在客户端再执行一遍。
> 服务端负责静态 dom 的拼接，而客户端负责事件的绑定
> 同构的应用场景不仅是模板页面渲染，还包括路由、`<head>` 标签的修改、数据的请求等。
> 可以理解成，服务器端渲染都是基于同构去展开的

通过`react-dom/client`提供的`hydrateRoot`则可以很好地实现这个需求，官方对`hydrateRoot`的介绍如下：

> Same as createRoot(), but is used to hydrate a container whose HTML contents were rendered by ReactDOMServer. React will attempt to attach event listeners to the existing markup.

也就是说它专门用来将`tsx`元素同构到服务端的，只会处理`tsx`中的事件相关的部分，而不会去管`DOM`的渲染，`DOM`的渲染我们已经交给服务端的`renderToString`去处理了

# 同构的应用场景

## 1. 模板页面渲染

这个已经在上面讲过了，不再赘述

## 2. 路由匹配

基于同构的概念，路由匹配这块也需要让客户端和服务端保持一致，也就是说客户端和服务端都要有相同的路由代码

不同点在于，客户端的路由是有状态的，而服务端的路由并不需要记录状态，所以在渲染路由组件的时候使用的是`<StaticRouter>`，而客户端使用的是`<BrowserRouter>`

服务端路由代码：

```tsx
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
```

客户端路由代码：

```tsx
const Client = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        {router.map((item, idx) => (
          <Route {...item} key={idx} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

hydrateRoot(document.getElementById('root') as Document | Element, <Client />)
```

## 3. 修改 <head> 标签

客户端页面中编写好相关`<head>`标签内容后，服务端渲染时需要获取到这部分信息，然后拼接到返回的模板中

由于客户端不同页面可能有不同的`<head>`配置，所以这里也需要应用同构，需要能够在服务端中动态获取到客户端页面的`<head>`标签内容进行展示

这一需求可以用`react-helmet`库去实现

页面组件中添加`<Helmet>`元素

```tsx
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
```

服务器端通过`Helmet.renderStatic()`与客户端同构

```tsx
app.get('*', (req, resp) => {
  // ...

  const helmet = Helmet.renderStatic()

  resp.send(`
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/index.js"></script>
      </body>
    </html>
  `)
})
```
