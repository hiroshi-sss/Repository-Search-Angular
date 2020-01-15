export class Repository {
    total_count: number
    items: RepoItems
}

export class RepoItems {
    id: number
    node_id: string
    name: string
    full_name: string
    description: string
    url: string
    watchers_count: number
    memo: string
}