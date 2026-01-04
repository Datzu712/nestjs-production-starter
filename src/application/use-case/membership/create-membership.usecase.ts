import type { CreateMembershipPort } from '@/application/ports/in/membership/create-membership';
import type { MembershipRepository } from '@/application/ports/out/membership.repository';

import type { TenantRepository } from '@/application/ports/out/tenant.repository';
import { TenantNotFoundError, MembershipAlreadyExistsError, MembershipCreationError } from '@/domain/errors';
import { CreateMembershipAttributes } from '@/domain/models/membership';

export class CreateMembershipUseCase implements CreateMembershipPort {
    constructor(
        private readonly membershipRepo: MembershipRepository,
        private readonly tenantRepo: TenantRepository,
    ) {}

    async execute({ tenantId, userId, role }: CreateMembershipAttributes): Promise<void> {
        const tenantExists = await this.tenantRepo.find({ id: tenantId });
        if (!tenantExists) {
            throw new TenantNotFoundError(tenantId);
        }

        const isMemberAlready = await this.membershipRepo.find({ userId, tenantId });
        if (isMemberAlready) {
            throw new MembershipAlreadyExistsError(userId, tenantId);
        }

        try {
            await this.membershipRepo.addUserToTenant({ userId, tenantId, role });
        } catch (error) {
            throw new MembershipCreationError(error);
        }
    }
}
