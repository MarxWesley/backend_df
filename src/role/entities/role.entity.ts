import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'Type_Users'})
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name', nullable: false, length: 255})
    name: string;

    @OneToMany(() => User, (user) => user.id, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    user: User;
}