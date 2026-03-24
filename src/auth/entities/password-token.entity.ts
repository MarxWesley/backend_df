import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('password_tokens')
export class PasswordToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    userId: number;

    @Column({ type: 'varchar' })
    token: string;

    @Column({ type: 'date' })
    expiresAt: Date;

    @Column({ type: 'boolean', default: false })
    used: boolean;
}