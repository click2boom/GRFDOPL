import { useState } from "react"
import { proxys } from "./data"
import { useEffect } from "react"
import { download, initState, reducer } from "./tools"
import HistoryView from "./components/HistoryView"
import Background from "./components/Background"
import ProxyList from "./components/ProxyList"
import Search from "./components/Search"
import Context from "./Context"
import { useReducer } from "react";
import { fetchProject, fetchRelease } from "./fetch"


const App = () => {
  const [data, setData] = useState('')
  const [proxy, setProxy] = useState(proxys[0].url)
  const [proxyWithFileUrl, setProxyWithFileUrl] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [project, setProject] = useState('')
  const [state, dispatch] = useReducer(reducer, initState());
  const handleData = (data) => {
    const n = data.split('/').length;
    const parts = data.split('/')
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
  const OnDataChange=()=>{
    handleData(data);
    if (author&&!project) {
      (async () => {
        const projects =await fetchProject(author)
        console.log(projects);
      })()
    }
    if (author&&project){
      (async () => {
        const files =await fetchRelease(author,project)
        console.log(files);
      })()
    }
  }
  useEffect(() => {
    OnDataChange()
  }, [data,author,project])
  useEffect(() => {
    console.log(state);

  }, [state])
  useEffect(() => {
    if (proxy && fileUrl) {
      setProxyWithFileUrl(`https://${proxy}/${fileUrl}`)
    }
  }, [proxy, fileUrl])

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
    console.log(data);
    if (data) {
      if (state.filter(line=>line.data==data).length==0){
        dispatch({ type: 'add', payload: { data: data } })
        OnDataChange()
      }
    } else {
      console.log('data is empty');
    }

  }

  return <>
    <Context.Provider value={{ setFileUrl, setAuthor, setProject, setData, state, dispatch }}>
      <section id='control'>
        <form onSubmit={handleSubmit} >
          <Search />
          <button type="submit">Submit</button>
        </form>
        <ProxyList proxy={proxy} setProxy={setProxy} />
      </section>
    </Context.Provider>

    <HistoryView />
    <Background />
  </>
}
export default App