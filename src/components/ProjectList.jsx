
const ProjectList = ({lines,onClick}) => {
    if (!lines) return <></>
    return (
        <ul id='project_list'>
            {lines.map((_data, index) =>
                <li key={index}>
                    <button onClick={() => onClick(_data)}>
                        {_data}
                    </button>
                </li>
            )}
        </ul>
    )
}
export default ProjectList