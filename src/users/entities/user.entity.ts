import { AuthToken } from "src/auth/entities/auth-token.entity";
import { PasswordToken } from "src/auth/entities/password-token.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', name: 'name', nullable: false, length: 255 })
    name: string;

    @Column({ type: 'varchar', nullable: false, length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: false, length: 100 })
    password: string;

    @ManyToOne(() => Role, (role) => role.name, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    role: Role;

    @OneToMany(() => AuthToken, (token) => token.user)
    authTokens: AuthToken[];

    @OneToMany(() => PasswordToken, (token) => token.user)
    passwordTokens: PasswordToken[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}