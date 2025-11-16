import { fetchProjects, fetchReleases } from "./fetch"

class SearchResults {
    constructor(author, project) {
        this.author = author
        this.project = project
        this.projects = []
        this.files = []
    }
    async setProjects() {
        if (!this.project && this.author) {
            this.projects = await fetchProjects(this.author)
        }
    }
    async setFiles() {
        if (this.author && this.project) {
            this.files = await fetchReleases(this.author, this.project)
        }
    }
    async getList() {
        if (!this.author) return ['Author Unset']
        await this.setProjects()
        await this.setFiles()
        return this.files || this.projects || ['all empty']
    }
}



const initHistory = () => {
    return JSON.parse(localStorage.getItem("lines")) || [
        {
            key: 0,
            data: {
                author: "microsoft",
                project: 'powertoys',
                file: 'toys'
            }
        }
    ]

}


const historyReducer = (state, action) => {
    switch (action.type) {
        case 'del': {
            const lines = state.filter(line => line.key !== action.payload.key)
            localStorage.setItem("lines", JSON.stringify(lines));
            return lines
        }
        case 'add': {
            const lines = [
                {
                    key: state.length,
                    data: action.payload.data
                }, ...state.filter(line =>
                    line.data.author !== action.payload.data.author &&
                    line.data.project !== action.payload.data.project &&
                    line.data.file !== action.payload.data.file
                )
            ];
            localStorage.setItem("lines", JSON.stringify(lines));
            return lines;
        }
        case 'reset':
            return history()
        default:
            return state
    }
}



export { initHistory, historyReducer, SearchResults }