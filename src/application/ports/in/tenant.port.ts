import type { CreateTenantAttributes, Tenant } from '@/domain/models/tenant';

export interface TenantPort {
    // Owner/User will be already created before reaching this use case
    createTenant(ownerId: string, tenantData: CreateTenantAttributes): Promise<Tenant>;
}
