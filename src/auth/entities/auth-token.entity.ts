import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('Auth_Tokens')
export class AuthToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.authTokens, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  user: User;
  
  @Column({ type: 'varchar' })
  token: string; // 🔐 HASH do refresh token

  @Column({ type: 'date' })
  expiresAt: Date;

  @Column({ type: 'boolean', default: false })
  revoked: boolean;
}