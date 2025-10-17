import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Review } from '../review/review.entity';

export enum RecipeCategory {
    BREAKFAST = 'Breakfast',
    LUNCH = 'Lunch',
    DINNER = 'Dinner',
    DESSERT = 'Dessert',
    APPETIZER = 'Appetizer',
    SNACK = 'Snack',
    DRINK = 'Drink',
}

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('json')
    ingredients: { name: string; quantity: string; unit: string }[];

    @Column('json')
    instructions: string[];

    @Column()
    preparationTime: number;

    @Column()
    cookingTime: number;

    @Column()
    servings: number;

    @Column({ type: 'enum', enum: RecipeCategory, default: RecipeCategory.DINNER })
    category: RecipeCategory;

    @Column('json', { nullable: true })
    tags?: string[];

    @ManyToOne(() => User, (user) => user.recipes)
    user: User;

    @Column()
    userId: number;

    @OneToMany(() => Review, (review) => review.recipe)
    reviews: Review[];
}
