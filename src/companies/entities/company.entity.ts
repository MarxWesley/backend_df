import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Company')
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nome_fantasia', type: 'varchar', length: 100, nullable: false })
    nome_fantasia: string;

    @Column({ name: 'razao_social', type: 'varchar', length: 150, nullable: false })
    razao_social: string;

    @Column({ name: 'cnpj', type: 'char', length: 14, nullable: false, unique: true })
    cnpj: string;

    @Column({ name: 'telefone', type: 'varchar', length: 11, nullable: false })
    telefone: string;

    // — Endereço —

    @Column({ name: 'logradouro', type: 'varchar', length: 150, nullable: false })
    logradouro: string;

    @Column({ name: 'numero', type: 'varchar', length: 10, nullable: false })
    numero: string;

    @Column({ name: 'complemento', type: 'varchar', length: 100, nullable: true })
    complemento: string | null;

    @Column({ name: 'bairro', type: 'varchar', length: 100, nullable: false })
    bairro: string;

    @Column({ name: 'cidade', type: 'varchar', length: 100, nullable: false })
    cidade: string;

    @Column({ name: 'uf', type: 'char', length: 2, nullable: false })
    uf: string;

    @Column({ name: 'cep', type: 'char', length: 8, nullable: false })
    cep: string;

    // — Contato RH —

    @Column({ name: 'contato_rh_nome', type: 'varchar', length: 100, nullable: false })
    contato_rh_nome: string;

    @Column({ name: 'contato_rh_email', type: 'varchar', length: 100, nullable: false })
    contato_rh_email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
