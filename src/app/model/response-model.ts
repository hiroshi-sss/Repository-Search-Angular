interface Repository {
    total_count: number,
    incomplete_results: boolean,
    items: RepoItems[]
}

interface RepoItems {
    id: number,
    node_id: string,
    name: string,
    full_name: string,
    private: boolean
}