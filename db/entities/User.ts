import {BaseEntity, Column, Entity, Index, OneToMany} from "typeorm";
import { Contents } from "./Contents";

@Index("user_pk", ["id"], { unique: true })
@Entity("User", { schema: "public" })
export class User extends BaseEntity {
    @Column("character varying", { primary: true, name: "id", length: 10 })
    id!: string;

    @Column("character varying", { name: "name", nullable: true, length: 20 })
    name!: string | null;

    @OneToMany(() => Contents, (contents) => contents.user)
    contents!: Contents[];
}
