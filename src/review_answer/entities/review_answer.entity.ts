import { Question } from "src/questions/entities/question.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ReviewAnswer')
export class ReviewAnswer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Review, (review) => review.answers, {
        onDelete: 'CASCADE',
    })
    review: Review;

    @ManyToOne(() => Question, (question) => question.answers, {
        onDelete: 'CASCADE',
    })
    question: Question;

    @Column('text', { nullable: false })
    answer: string;

    @CreateDateColumn()
    created_at: Date;

}
