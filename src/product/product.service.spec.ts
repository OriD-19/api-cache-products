import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheConfigService } from 'src/cache/cache.service';
 
@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepo: Repository<Product>,
 
        @Inject(CacheConfigService)
        private cacheManager: Cache,
    ) { }
 
    async findAll() {
        const cacheKey = 'products_all';
        console.log(this.cacheManager);
        const cached = await this.cacheManager.get(cacheKey);
        console.log('ver cache', cached);
        if (cached) {
            console.log('📦 Usando datos del caché');
            return cached;
        }
 
        console.log('💾 Consultando BD y guardando en caché');
        const products = await this.productRepo.find();
        await this.cacheManager.set(cacheKey, products, 30);
        return products;
    }
 
    async create(data: Partial<Product>) {
        await this.cacheManager.del('products_all');
        const newProduct = this.productRepo.create(data);
        return this.productRepo.save(newProduct);
    }
}
