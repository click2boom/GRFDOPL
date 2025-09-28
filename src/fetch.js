
const api_host = 'api.github.com'
const fetchProjects = async (author) => {
    console.log('Fetch Project ...');
    let projects

    try {
        const response = await fetch(`https://${api_host}/users/${author}/repos`)


        const data = await response.json()
        if (response.status !== 200) {
            return [data.message]
        }
        projects = data.map(project => project.name)
    } catch (err) {
        console.err(err);

    }

    return projects
}
const fetchReleases = async (author, project) => {
    console.log('Fetch Release ...');
    let files
    try {
        const response = await fetch(`https://${api_host}/repos/${author}/${project}/releases/latest`)


        const data = await response.json()
        if (response.status !== 200) {
            return [data.message]
        }
        files = data.assets.map(file => file.name)
    } catch (err) {
        console.err(err);

    }
    return files
}
export { fetchProjects, fetchReleases }