import { HttpClient } from '../interfaces/HttpClient';
import axios, { AxiosInstance } from 'axios';

export class Axios implements HttpClient {
    private readonly instance: AxiosInstance;

    constructor(baseUrl: string) {
        this.instance = axios.create({
            baseURL: baseUrl,
            timeout: 1000,
        });
    }

    async get<TResponse>(url: string): Promise<TResponse> {
        const response = await this.instance.get<TResponse>(url);
        return response.data;
    }
}
