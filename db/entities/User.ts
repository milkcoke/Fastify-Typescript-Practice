import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";

@Entity('User', {schema: 'public'})
export class User extends BaseEntity{
    @PrimaryColumn({type: 'varchar', length: 10})
    id!: string;

    @Column({type: 'varchar', length: 20})
    name!: string;
}