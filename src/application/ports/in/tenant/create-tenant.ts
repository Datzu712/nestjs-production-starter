import type { CreateTenantAttributes, Tenant } from '@/domain/models/tenant';

export interface CreateTenantPort {
    // Owner/User will be already created before reaching this use case
    execute(ownerId: string, tenantData: CreateTenantAttributes): Promise<Tenant>;
}
