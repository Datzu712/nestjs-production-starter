import { isValidEmail } from '@/shared/utils/validate-email.util';

import { ValidationError } from '../errors/domain-errors';
import { CreateUserAttributes } from '../models/user';

export function validateCreateUser(data: CreateUserAttributes): void {
    if (!data.email) throw new ValidationError('Email is required');
    if (!isValidEmail(data.email)) throw new ValidationError('Invalid email');
}
