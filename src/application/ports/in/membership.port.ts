export interface MembershipPort {
    addUserToTenant(userId: string, tenantId: string): Promise<void>;
}
