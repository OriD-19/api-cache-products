// src/cache/cache.service.ts
import { Injectable } from '@nestjs/common';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis-yet';
 
@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
    createCacheOptions(): CacheModuleOptions {
        return {
            store: redisStore,
            host: 'localhost',
            port: 6379,
            ttl: 10,
            isGlobal: true,
        };
    }
}
 
