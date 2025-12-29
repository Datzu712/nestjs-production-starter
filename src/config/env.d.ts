export interface IEnvironmentVariables {
    NODE_ENV: 'development' | 'production' | 'test';
    USER_IN_MEMORY_DB?: 'true' | 'false';
    DATABASE_URL: string;
    HTTP_PORT?: number;
}
