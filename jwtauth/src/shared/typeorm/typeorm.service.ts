import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    @Inject(ConfigService)
    private readonly config: ConfigService;

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.config.get<string>('DATABASE_HOST') || process.env.DATABASE_HOST,
            port: this.config.get<number>('DATABASE_PORT') || parseInt(process.env.DATABASE_PORT, 10),
            database: this.config.get<string>('DATABASE_NAME') || process.env.DATABASE_NAME,
            username: this.config.get<string>('DATABASE_USER') || process.env.DATABASE_USER,
            password: this.config.get<string>('DATABASE_PASSWORD') || process.env.DATABASE_PASSWORD,
            entities: ['dist/**/*.entity.{ts,js}'],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
            synchronize: true, // never use TRUE in production!
        };
    }
}