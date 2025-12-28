export interface MembershipRepository {
    addUserToTenant(data: { userId: string; tenantId: string }): Promise<void>;
    isUserMemberOfTenant(data: { userId: string; tenantId: string }): Promise<boolean>;
}
