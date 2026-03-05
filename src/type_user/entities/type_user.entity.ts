import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'Type_Users'})
export class TypeUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false, length: 255})
    type: string;

    @OneToMany(() => User, (user) => user.id, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    user: User;
}