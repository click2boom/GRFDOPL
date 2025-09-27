import { useState } from "react"
import { proxys, imagesApi } from "./data"
import { useEffect } from "react"
import { download } from "./tools"
const App = () => {
  const [proxy, setProxy] = useState(proxys[0].url)
  const [fileUrl, setFileUrl] = useState('')
  const [proxyWithFileUrl, setProxyWithFileUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [project, setProject] = useState('')
  const [isSideOpen, setIsSideOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(window.innerWidth < window.innerHeight)
  }, [isMobile])
  useEffect(() => {
    if (proxy && fileUrl) {
      setProxyWithFileUrl(`https://${proxy}/${fileUrl}`)
    }
  }, [proxy, fileUrl])
  const handleInput = (e) => {
    const url = e.target.value
    if (url.startsWith('https://')) {
      setFileUrl(url)
    } else {
      const n = url.split('/').length;
      const parts = url.split('/')
      switch (n) {
        case 1:
          // author
          setAuthor(parts[0])
          console.log('查询用户所有项目....');
          break;
        case 2:
          // author/project
          setAuthor(parts[0])
          setProject(parts[1])
          console.log('查询项目所有文件....');
          break
        default:
          console.error('输入错误:', parts)
          break;
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // 状态:
    // 下载
    // 查询项目 
    // 查询文件
    console.log('submit');

    if (!fileUrl) console.log('当前文件地址为空')
    if (!author) console.log('未解析到作者')
    if (!project) console.log('未解析到项目')
    if (!proxy) console.warn('未选择代理');
    if (!proxy) return
    if (proxyWithFileUrl) {
      download(proxyWithFileUrl)
      console.log('downloaded', proxyWithFileUrl);

    }

  }

  return <>

    <section id='control'>
      <form onSubmit={handleSubmit} >
        <input type="text"
          placeholder="Typeing Url ... "
          onChange={handleInput}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {proxys.map((_proxy, index) =>
          <li key={index} className={_proxy.url === proxy ? 'active' : ''}>
            <button onClick={() => setProxy(_proxy.url)}>
              <i>{_proxy.name}</i>
              <a href={"https://" + _proxy.url}
                target='_blank'
                referrerPolicy="no-referrer"
              >{_proxy.url}</a>
            </button>
          </li>
        )}
      </ul>
    </section>
    <section id='view' className={isSideOpen ? "" : "hidden"}>
      <button id='history' onClick={() => setIsSideOpen(!isSideOpen)}>
        {isSideOpen ? "history" : "close"}
      </button>
    </section>
    <i id="background" style={{
      backgroundImage: `url("${isMobile ? imagesApi.mobile : imagesApi.desktop}")`
    }} />
  </>
}
export default App