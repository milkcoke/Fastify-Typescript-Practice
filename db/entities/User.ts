import {BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Contents } from "./Contents";

@Index("User_pkey", ["id", "loginId"], { unique: true })
@Entity("User", { schema: "public" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id!: number;

    @Column("character varying", { name: "name", nullable: true, length: 20 })
    name!: string | null;

    @Column("character varying", { primary: true, name: "login_id", length: 31 })
    loginId!: string;
}
