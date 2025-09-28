const ProxyCard = ({ url, name, proxy, setProxy }) => {
    return <li className={url === proxy ? 'active' : ''}>
        <button onClick={() => setProxy(url)}>
            <i>{name}</i>
            <a href={"https://" + url}
                referrerPolicy="no-referrer"
                rel="noopener"
                target="_blank"
                data-zone="null">
                {url}
            </a>

        </button>
    </li>
}

export default ProxyCard