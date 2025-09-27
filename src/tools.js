
const download = (url) => {
    const a = document.createElement('a')
    a.href = url
    a.setAttribute('target', '_blank')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}


const initState = () => {
    return JSON.parse(localStorage.getItem("lines")) || []
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'del': {
            const lines = state.filter(line => line.key !== action.payload.key)
            localStorage.setItem("lines", JSON.stringify(lines));
            return lines
        }
        case 'add': {
            const lines = [{
                key:state.length,
                data:action.payload.data
            },...state];
            localStorage.setItem("lines", JSON.stringify(lines));
            return lines;
        }
        case 'reset':
            return initState()
        default:
            return state
    }
}



export { download,reducer,initState }