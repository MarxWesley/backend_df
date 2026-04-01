import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Person')
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
    nome: string;

    @Column({ name: 'cpf', type: 'varchar', length: 11, nullable: false, unique: true })
    cpf: string;

    @Column({ type: 'date', nullable: true })
    data_nascimento: Date;

    @Column({ type: 'date', nullable: true })
    data_entrada: Date;

    @Column({ type: 'varchar', length: 20, nullable: true })
    telefone: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    nome_responsavel: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    telefone_responsavel: string;

    @Column({ type: 'boolean', default: false })
    usa_medicamento: boolean;

    @Column({ type: 'text', nullable: true })
    info_medicamentos: string;

    @Column({ type: 'boolean',  default: true })
    ativo: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}