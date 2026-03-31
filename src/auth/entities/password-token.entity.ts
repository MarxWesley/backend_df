import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('password_tokens')
export class PasswordToken {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.passwordTokens, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    user: User;

    @Column({ type: 'int' })
    userId: number;

    @Column({ type: 'varchar' })
    token: string;

    @Column({ type: 'date' })
    expiresAt: Date;

    @Column({ type: 'boolean', default: false })
    used: boolean;
}