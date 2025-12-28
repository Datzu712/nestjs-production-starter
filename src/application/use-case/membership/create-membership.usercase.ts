import type { CreateMembershipPort } from '@/application/ports/in/membership/create-membership.port';
import type { MembershipRepository } from '@/application/ports/out/membership.repository';

import type { TenantRepository } from '@/application/ports/out/tenant.repository';
import { TenantNotFoundError } from '@/domain/errors';
import { UserAlreadyAssignedToTenantError, UserAssignmentError } from '@/domain/errors/membership.errors';
import { CreateMembershipAttributes } from '@/domain/models/membership';

export class CreateMembershipUseCase implements CreateMembershipPort {
    constructor(
        private readonly membershipRepo: MembershipRepository,
        private readonly tenantRepo: TenantRepository,
    ) {}

    async execute({ tenantId, userId, role }: CreateMembershipAttributes): Promise<void> {
        const tenantExists = await this.tenantRepo.find({ id: tenantId });
        if (!tenantExists) {
            throw new TenantNotFoundError();
        }

        const isMemberAlready = await this.membershipRepo.find({ userId, tenantId });
        if (isMemberAlready) {
            throw new UserAlreadyAssignedToTenantError();
        }

        try {
            await this.membershipRepo.addUserToTenant({ userId, tenantId, role });
        } catch (error) {
            throw new UserAssignmentError(error);
        }
    }
}
