import Context from "../Context"
import { useContext } from "react"
import FileList from "./FileList"
import ProjectList from "./ProjectList"
const Search = () => {
    const {
        projects, files,
        onFileClick, onProjectClick,
        inputRef,handleInputChange,InputValue
    } = useContext(Context)
    console.log(projects);
    console.log(files);
    
    const SearchList=()=><span id="search_list">
        {<FileList lines={files} onClick={onFileClick} />}
        {files.length || <ProjectList lines={projects} onClick={onProjectClick} />}

    </span>
    return (<>
        <input type="text" ref={inputRef}
            placeholder="Typeing ... "
            onChange={handleInputChange}
            value={InputValue}
        />
        <SearchList/>
    </>)
}




export default Search