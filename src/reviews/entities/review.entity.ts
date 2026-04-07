import { Person } from "src/people/entities/person.entity";
import { ReviewAnswer } from "src/review_answer/entities/review_answer.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Reviews')
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Person, (person) => person.reviews, {
        onDelete: 'CASCADE',
    })
    person: Person;

    @Column({ length: 255, nullable: true })
    tipo: string;

    @Column({ length: 255, nullable: true })
    professor_responsavel: string;

    @CreateDateColumn()
    data_avaliacao: Date;

    // 🔗 respostas
    @OneToMany(() => ReviewAnswer, (answer) => answer.review)
    answers: ReviewAnswer[];
}