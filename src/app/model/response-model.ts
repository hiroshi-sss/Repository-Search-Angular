interface Repository {
    total_count: number,
    items: RepoItems[]
}

interface RepoItems {
    id: number,
    node_id: string,
    name: string,
    full_name: string,
    description: string,
    url: string,
    watchers_count: number,
}