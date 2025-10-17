import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Recipe } from '../recipe/recipe.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comment?: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.reviews)
  recipe: Recipe;

  @Column()
  recipeId: number;
}
