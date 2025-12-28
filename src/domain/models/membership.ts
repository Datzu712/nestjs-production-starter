import type { MembershipRole } from '../constants/membership-roles';

export interface Membership {
    userId: string;
    tenantId: string;
    role: MembershipRole;
}

export type CreateMembershipAttributes = Membership;
