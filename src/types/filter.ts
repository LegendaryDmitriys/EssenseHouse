export interface FilterOption {
    id: number
    name: string
    field_name: string
    filter_type: "exact" | "range" | "contains"
    options: {
        min?: number
        max?: number
        values?: any[]
    }
}

