import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Company')
export class Company {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ name: 'nome_fantasia', type: 'varchar', length: 255, nullable: false})    
    nome_fantasia: string;
    
    @Column({ name: 'razao_social', type: 'varchar', length: 255})
    razao_social: string;
    
    @Column({ name: 'cnpj', type: 'varchar', length: 20, nullable: false})
    cnpj: string;
    
    @Column({ name: 'endereco', type: 'text', })
    endereco: string;
    
    @Column({ name: 'telefone', type: 'varchar', length: 100})
    telefone: string;
    
    @Column({ name: 'contato_rh_nome', type: 'varchar', length: 100})
    contato_rh_nome: string;
    
    @Column({ name: 'contato_rh_email', type: 'varchar', length: 100})
    contato_rh_email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
