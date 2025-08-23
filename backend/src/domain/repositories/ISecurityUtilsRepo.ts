export interface ISecurityUtilsRepo {
    generateHash(algorithm: string, data: string): string;
}
