import { ISecurityUtilsRepo } from '@domain/repositories/ISecurityUtilsRepo';
import { createHash } from 'crypto';
import { Service } from 'typedi';

@Service()
export class SecurityUtils implements ISecurityUtilsRepo {
    generateHash(algorithm: string, data: string): string {
        return createHash(algorithm).update(data).digest('hex');
    }
}
