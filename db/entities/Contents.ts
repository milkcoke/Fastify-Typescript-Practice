import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {User} from "./User";

@Entity('contents', {schema: 'public'})
export class Contents extends BaseEntity{
    @PrimaryColumn({name: 'contents_id', type: 'integer'})
    contentsId!: number;

    @Column({name: 'contents_type', type: 'varchar', default: 'video'})
    contentsType!: string;

    // user can have multiple contents, but each contents is owned by only one single user.
    @ManyToOne(()=>User, {
        cascade: ["update"],
    })
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user!: User
}