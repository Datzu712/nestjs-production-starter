import type { CreateMembershipAttributes } from '@/domain/models/membership';

export interface CreateMembershipPort {
    execute(data: CreateMembershipAttributes): Promise<void>;
}
