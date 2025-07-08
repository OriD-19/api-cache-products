import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheConfigService } from './cache/cache.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'suser',
      database: 'products_db2',
      synchronize: true,
      autoLoadEntities: true,
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigService,
      isGlobal: true,
    }),
    ProductModule,
  ],
  providers: [CacheConfigService],
})
export class AppModule { }
