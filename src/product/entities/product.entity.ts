import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
 
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    name: string;
 
    @Column('decimal')
    price: number;
}
