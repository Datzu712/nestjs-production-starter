import type { CreateTenantAttributes, Tenant } from '@/domain/models/tenant';
import { validateCreateTenant } from '@/domain/validators/tenant.validator';
import { TenantCreationError } from '@/domain/errors';
import { MEMBERSHIP_ROLES } from '@/domain/constants/membership-roles';

import type { CreateTenantPort } from '../../ports/in/tenant/create-tenant';
import type { TenantRepository } from '../../ports/out/tenant.repository';
import type { MembershipRepository } from '../../ports/out/membership.repository';

export class CreateTenantUseCase implements CreateTenantPort {
    constructor(
        private readonly tenantRepository: TenantRepository,
        private readonly membershipRepository: MembershipRepository,
    ) {}

    async execute(ownerId: string, tenantData: CreateTenantAttributes): Promise<Tenant> {
        validateCreateTenant(tenantData);

        let tenant: Tenant | null = null;

        try {
            tenant = await this.tenantRepository.create(tenantData);

            await this.membershipRepository.addUserToTenant({
                userId: ownerId,
                tenantId: tenant.id,
                role: MEMBERSHIP_ROLES.OWNER,
            });

            return tenant;
        } catch (error) {
            if (tenant) {
                await this.tenantRepository.delete(tenant.id);
            }

            throw new TenantCreationError(error);
        }
    }
}
