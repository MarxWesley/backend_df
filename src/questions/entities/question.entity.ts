import { ReviewAnswer } from "src/review_answer/entities/review_answer.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Question')
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: false }) 
    question: string;

    @OneToMany(() => ReviewAnswer, (answer) => answer.question)
    answers: ReviewAnswer[];
}