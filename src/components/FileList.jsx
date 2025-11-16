const FileList = ({lines,onClick}) => {
  if (!lines) return <></>
  return (
    <ul id='file_list'>
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
export default FileList