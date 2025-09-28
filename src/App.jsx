import { useReducer, useEffect, useState, useRef, useCallback } from "react";
import { download } from "./tools"
import { proxys, downloadApi } from "./data"
import Context from "./Context"
import HistoryView from "./components/HistoryView"
import Background from "./components/Background"
import ProxyList from "./components/ProxyList"
import Search from "./components/Search"
import { fetchProjects, fetchReleases } from "./fetch"
import { historyReducer, initHistory } from "./state";
import { debounce } from "lodash";
const App = () => {
  const debounced = useCallback(
    debounce((value) => {
      matchInputValue(value)
    }, 400), []
  );
  const [open, setOpen] = useState(false)
  const [proxy, setProxy] = useState(proxys[0].url)
  const [proxyWithFileUrl, setProxyWithFileUrl] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [project, setProject] = useState('')
  const [history, historyDispatch] = useReducer(historyReducer, initHistory());
  const inputRef = useRef(null)
  const [projects, setProjects] = useState([])
  const [files, setFiles] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (proxy && fileUrl) {
      setProxyWithFileUrl(`https://${proxy}/${fileUrl}`)
    }
  }, [proxy, fileUrl])
  const onHistoryLineClick = (line) => {
    setAuthor(line.author)
    setProject(line.project)

    if (line.project) {
      inputRef.current.value = `${line.author}/${line.project}`
    } else {
      inputRef.current.value = `${line.author}`
    }
    console.log(author, project);
    analyseInput(inputValue)
  }
  const analyseInput = (value) => {
    if (value.startsWith('https://')) {
      setFileUrl(value)
    }
    if (proxyWithFileUrl) {
      download(proxyWithFileUrl)
      console.log('Download:', proxyWithFileUrl);
      return
    }
    const parts = value.split('/')
    switch (parts.length) {
      case 1:
        setAuthor(parts[0]);
        (async () => {
          setProjects(await fetchProjects(parts[0]))
        })()
        break;
      case 2:
        setAuthor(parts[0]);
        setProject(parts[1]);
        (async () => {
          setFiles(await fetchReleases(parts[0], parts[1]))
        })()
        break
      default:

        break;
    }
    console.log(parts);
  }

  const matchInputValue = (value) => {
    if (!value) {
      setAuthor('')
      setProject('')
      setProjects('')
      setFiles('')
      return
    }

    console.log(value);
    analyseInput(value)

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!proxy) return
    console.log('submit');
    matchInputValue(inputValue)
  }

  const onFileClick = (line) => {
    const url = downloadApi
      .replace('{author}', author)
      .replace('{project}', project)
      .replace('{file}', line)
    setFileUrl(url)
    download(proxyWithFileUrl)
  }
  const onProjectClick = (line) => {
    inputRef.current.value = `${author}/${line}`
    setInputValue(inputRef.current.value)
    analyseInput(inputValue)
  }
  const handleInputChange = (e) => {
    e.preventDefault()
    const value = e.target.value
    setInputValue(value)
    console.log(value);
    debounced(value)
  }

  return <>
    <i id='info'>
      <h3>{!author || `Author: ${author}`}</h3>
      <h3>{!project || `Project: ${project}`}</h3>
      <h3>{!fileUrl || `FileUrl: ${fileUrl}`}</h3>
    </i>
    <Context.Provider value={{
      setProxy, setOpen, setInputValue,
      history, proxy, open, projects, files, inputValue, inputRef,
      historyDispatch, handleInputChange,
      onHistoryLineClick, onFileClick, onProjectClick,

    }}>
      <section id='main'>
        <form onSubmit={handleSubmit} >
          <Search />
          <button type="submit">Submit</button>
        </form>
        <ProxyList />
      </section>
      <HistoryView />
    </Context.Provider>
    <Background />
  </>
}
export default App