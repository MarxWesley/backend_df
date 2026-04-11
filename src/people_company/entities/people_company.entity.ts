import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PeopleCompanyStatus } from "../enums/people-company-status.enum";
import { Person } from "src/people/entities/person.entity";
import { Company } from "src/companies/entities/company.entity";

@Entity('PeopleCompany')
export class PeopleCompany {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Person, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'pessoa_id' })
    pessoa: Person;

    @ManyToOne(() => Company, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'empresa_id' })
    empresa: Company;
    
    @Column({ name: 'pessoa_id', type: 'bigint', nullable: false })
    pessoa_id: number;

    @Column({ name: 'empresa_id', type: 'bigint', nullable: false })
    empresa_id: number;

    @Column({ name: 'data_admissao', type: 'date', nullable: false })
    data_admissao: string;

    @Column({ name: 'data_desligamento', type: 'date', nullable: true })
    data_desligamento: string | null;

    @Column({ name: 'funcao', type: 'varchar', length: 100, nullable: false })
    funcao: string;

    @Column({ name: 'contato_rh', type: 'varchar', length: 100, nullable: false })
    contato_rh: string;

    @Column({ name: 'status', type: 'enum', enum: PeopleCompanyStatus, nullable: false })
    status: PeopleCompanyStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}