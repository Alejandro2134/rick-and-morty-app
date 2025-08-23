export interface HttpClient {
    get<TRes>(url: string): Promise<TRes>;
}
