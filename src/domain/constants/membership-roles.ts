export const MEMBERSHIP_ROLES = {
    OWNER: 'OWNER',
    ADMIN: 'ADMIN',
    USER: 'USER',
} as const;
export type MembershipRole = (typeof MEMBERSHIP_ROLES)[keyof typeof MEMBERSHIP_ROLES];
