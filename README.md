# NestJS Hexagonal Architecture Template

A production-ready NestJS template implementing Hexagonal Architecture (Ports & Adapters) with multi-tenancy support, built with TypeScript, Prisma, and Fastify.

## Architecture Overview

This template follows **Hexagonal Architecture** principles, separating business logic from infrastructure concerns:

```text
src/
├── domain/              # Business logic & rules (framework-agnostic)
│   ├── models/         # Domain entities
│   ├── errors/         # Domain-specific errors
│   ├── validators/     # Business validation rules
│   └── constants/      # Domain constants
│
├── application/         # Use cases & ports
│   ├── ports/
│   │   ├── in/        # Input ports (interfaces for use cases)
│   │   └── out/       # Output ports (repository interfaces)
│   └── use-case/      # Business use case implementations
│
├── infrastructure/      # Adapters & external dependencies
│   └── adapters/
│       ├── in/        # Inbound adapters (REST, GraphQL)
│       └── out/       # Outbound adapters (Database, External APIs)
│
├── config/             # Application configuration
└── shared/             # Shared utilities & constants
```

### Key Architectural Benefits

- **Technology Agnostic Core**: Domain and application layers are independent of frameworks
- **Testability**: Easy to mock dependencies and test in isolation
- **Maintainability**: Clear separation of concerns
- **Flexibility**: Easy to swap adapters (e.g., switch from REST to GraphQL)

## Tech Stack

- **Framework**: NestJS 11 with Fastify adapter
- **Language**: TypeScript 5.9
- **Database ORM**: Prisma 7.2
- **Validation**: class-validator & class-transformer
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Code Quality**: ESLint, Prettier, Husky

## Features

- ✅ Hexagonal Architecture implementation
- ✅ Multi-tenancy support (User-Tenant-Membership model)
- ✅ Domain-driven error handling
- ✅ Global exception filters
- ✅ API versioning
- ✅ Swagger documentation (non-production only)
- ✅ Type-safe environment variables
- ✅ Git hooks with Husky
- ✅ Production-ready configuration

## Domain Model

The template includes a complete multi-tenant user management system:

### Entities

- **User**: Core user entity with authentication
- **Tenant**: Organization/workspace entity
- **Membership** (tenant_user): Relationship between users and tenants with roles

### Relationships

```text
User 1─────╮
           │
           ├── N Membership (with roles)
           │
Tenant 1───╯
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- PostgreSQL database

### Installation

```bash
# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env

# Configure your DATABASE_URL in .env
# Run database migrations
pnpm prisma migrate dev

# Start development server
pnpm dev
```

## Configuration

Environment variables are validated at startup using `class-validator`:

```typescript
DATABASE_URL      # PostgreSQL connection string
HTTP_PORT         # Application port (default: 3000)
NODE_ENV          # Environment: development | production | test
API_DOCS_URL      # API documentation URL
```

See [src/config/env.validation.ts](src/config/env.validation.ts) for complete configuration options.

## Code Organization

### Domain Layer (`src/domain/`)

Contains pure business logic with no external dependencies:

```typescript
// Domain Model
export interface User {
    id: string;
    email: string;
    username: string;
    isActive: boolean;
}

// Domain Errors
export class EmailAlreadyInUseError extends DomainError {
    constructor(email: string) {
        super({
            code: ErrorCodes.USER_EMAIL_ALREADY_IN_USE,
            message: `Email ${email} is already in use`,
        });
    }
}
```

### Application Layer (`src/application/`)

Implements business use cases by coordinating domain logic:

```typescript
// Input Port (Interface)
export interface CreateUserPort {
    execute(userData: CreateUserAttributes): Promise<User>;
}

// Use Case (Implementation)
export class CreateUserUseCase implements CreateUserPort {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(userData: CreateUserAttributes): Promise<User> {
        validateCreateUser(userData);
        // Business logic...
    }
}
```

### Infrastructure Layer (`src/infrastructure/`)

Adapts external systems to application needs:

```typescript
// REST Controller (Inbound Adapter)
@Controller({ version: '1', path: 'users' })
export class UserController {
    constructor(
        @Inject(DI_TOKENS.CREATE_USER_USE_CASE)
        private readonly createUserUseCase: CreateUserUseCase,
    ) {}

    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        return this.createUserUseCase.execute(dto);
    }
}

// Repository (Outbound Adapter)
export class PrismaUserRepository implements UserRepository {
    async create(userData: CreateUserAttributes): Promise<User> {
        // Prisma implementation...
    }
}
```

## Error Handling

The template implements a sophisticated domain-driven error handling system following [RFC 7807 (Problem Details for HTTP APIs)](https://www.rfc-editor.org/rfc/rfc7807.html):

1. **Domain Errors**: Pure business errors defined in the domain layer
2. **Error Codes**: Centralized error code registry
3. **Exception Filters**: HTTP error mapping in infrastructure layer
4. **Standardized Response**: Consistent error response structure across all endpoints

```typescript
// Domain Error
throw new EmailAlreadyInUseError('user@example.com');

// Automatically mapped to RFC 7807 compliant response:
// HTTP 409 Conflict
{
  "type": "https://api.example.com/errors/user-email-already-in-use",
  "title": "Conflict",
  "status": 409,
  "detail": "Email user@example.com is already in use",
  "errorCode": "USER_EMAIL_ALREADY_IN_USE",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "instance": "/v1/users"
}
```

## Testing

The architecture facilitates easy testing at all layers:

```typescript
// Unit test (domain/application)
describe('CreateUserUseCase', () => {
    it('should throw error when email exists', async () => {
        const mockRepo = { find: jest.fn().mockResolvedValue(existingUser) };
        const useCase = new CreateUserUseCase(mockRepo);

        await expect(useCase.execute(userData)).rejects.toThrow(EmailAlreadyInUseError);
    });
});
```

## API Documentation

Swagger documentation is automatically generated and available at:

- **Swagger UI**: `http://localhost:3000/api`
- **JSON Spec**: `http://localhost:3000/api-json`

Only available in non-production environments.

## Best Practices

This template enforces:

- ✅ **Dependency Inversion**: High-level modules don't depend on low-level modules
- ✅ **Single Responsibility**: Each class has one reason to change
- ✅ **Interface Segregation**: Clients depend only on interfaces they use
- ✅ **Domain Protection**: Business rules isolated from infrastructure
- ✅ **Type Safety**: Strict TypeScript configuration
- ✅ **Code Quality**: Automated linting and formatting

## Adding New Features

To add a new feature (e.g., "Products"):

1. **Domain**: Create model, errors, and validators in `src/domain/`
2. **Application**: Define ports in `src/application/ports/` and implement use case
3. **Infrastructure**: Create controller in `src/infrastructure/adapters/in/rest/`
4. **Repository**: Implement repository in `src/infrastructure/adapters/out/repositories/`
5. **Module**: Wire dependencies with NestJS DI

## Todo List

### Infrastructure & DevOps

- [ ] Docker support (with compose & watch mode for local development)
- [ ] Kubernetes manifests
- [ ] Docker Swarm configuration (alternative to Kubernetes)

### API Development

- [ ] Complete REST endpoints for Tenant and Membership management
- [ ] GraphQL adapter implementation
- [ ] GraphQL schema and resolvers
- [ ] WebSocket support for real-time features as part of the template
- [ ] Caching layer integration (e.g., Redis)
- [ ] Maybe use something like json api spec for defining standardized api responses (<https://jsonapi.org/>)?

### Security & Authentication

- [ ] Basic JWT authentication implementation
- [ ] API rate limiting

### Error Handling & Validation

- [ ] Complete exception filter coverage for all error types
- [ ] Custom validation pipe with detailed error responses
- [ ] Logging integration for error tracking (e.g., Sentry, pino)

### Testing & Documentation

- [ ] add more tests 😭

## License

MIT
