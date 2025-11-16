export const LogCard = ({ data }) => {
    return (<span className="logcard">
        <h4>{data}</h4>
        <button
            onClick={() => console.log('del')}
        >del</button>
    </span>
    )
}
