import type { CreateMembershipAttributes, Membership } from '@/domain/models/membership';

export interface MembershipRepository {
    addUserToTenant(data: CreateMembershipAttributes): Promise<void>;
    find(query: Partial<Membership>): Promise<Membership | null>;
}
