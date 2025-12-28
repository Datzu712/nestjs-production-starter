import type { CreateTenantAttributes, Tenant } from '@/domain/models/tenant';

export interface TenantRepository {
    create(data: CreateTenantAttributes): Promise<Tenant>;
    delete(tenantId: string): Promise<void>;
    find(query: Partial<Tenant>): Promise<Tenant | null>;
}
