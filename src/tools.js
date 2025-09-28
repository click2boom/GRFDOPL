
const download = (url) => {
    console.log(url);
    
    const a = document.createElement('a')
    a.href = url
    a.setAttribute('target', '_blank')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

export { download}