import { PeopleCompany } from "src/people_company/entities/people_company.entity";
import { Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class MonitoringSheet {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PeopleCompany, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'people_company_id' })
    people_company: PeopleCompany;

    @Column({ name: 'data_visita', type: 'date', nullable: false })
    data_visita: string;

    @Column({ name: 'contato_rh', type: 'varchar', length: 100, nullable: false })
    contato_rh: string;

    @Column({ name: 'parecer_geral', type: 'text', nullable: true })
    parecer_geral: string | null;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;
}