import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dtos/create-review.dto';
import { User } from '../user/user.entity';
import { RecipeService } from '../recipe/recipe.service';
import { UpdateReviewDto } from './dtos/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private recipeService: RecipeService,
  ) {}

  async create(createReviewDto: CreateReviewDto, user: User): Promise<Review> {
    const { recipeId, rating, comment } = createReviewDto;

    // Check if the recipe exists
    const recipe = await this.recipeService.findOne(recipeId);
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }

    // Check if the user has already reviewed this recipe
    const existingReview = await this.reviewRepository.findOne({ where: { recipeId, userId: user.id } });
    if (existingReview) {
      throw new ConflictException('You have already reviewed this recipe');
    }

    const review = this.reviewRepository.create({ ...createReviewDto, user, recipe, userId: user.id });
    return this.reviewRepository.save(review);
  }

  async findAllByRecipe(recipeId: number): Promise<Review[]> {
    return this.reviewRepository.find({ where: { recipeId }, relations: ['user'] });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id }, relations: ['user', 'recipe'] });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto, userId: number): Promise<Review> {
    const review = await this.findOne(id);

    if (review.userId !== userId) {
      throw new ForbiddenException('You do not have permission to update this review');
    }

    Object.assign(review, updateReviewDto);
    return this.reviewRepository.save(review);
  }

  async remove(id: number, userId: number): Promise<void> {
    const review = await this.findOne(id);

    if (review.userId !== userId) {
      throw new ForbiddenException('You do not have permission to delete this review');
    }

    await this.reviewRepository.remove(review);
  }
}
