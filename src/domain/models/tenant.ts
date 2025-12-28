export interface Tenant {
    id: string;
    name: string;
    isActive: boolean;
}

export type CreateTenantAttributes = Pick<Tenant, 'isActive' | 'name'>;
