import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Auth_Tokens')
export class AuthToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'varchar' })
  token: string; // 🔐 HASH do refresh token

  @Column({ type: 'date' })
  expiresAt: Date;

  @Column({ type: 'boolean', default: false })
  revoked: boolean;
}