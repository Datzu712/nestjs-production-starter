import { ValidationError } from '../errors';
import type { CreateTenantAttributes } from '../models/tenant';

/*
 * Data validations could be written inside the constructor of the domain models,
 * but in this case we are using models as interfaces instead of classes but its the same idea.
 */
export function validateCreateTenant(data: CreateTenantAttributes): void {
    if (!data.name?.trim()) {
        throw new ValidationError('Tenant name is required');
    }
}
