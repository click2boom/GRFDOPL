import { proxys } from "../data"
import ProxyCard from "../components/ProxyCard"
import { useContext } from "react"
import Context from "../Context"
const ProxyList = () => {
  const {proxy,setProxy}= useContext(Context)
  return (
    <ul>
        {proxys.map((_proxy, index) =>
          <ProxyCard key={index}
            url={_proxy.url} name={_proxy.name}
            proxy={proxy} setProxy={setProxy}
          />
        )}
      </ul>
  )
}

export default ProxyList