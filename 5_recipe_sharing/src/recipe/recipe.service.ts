import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { User } from '../user/user.entity';

@Injectable()
export class RecipeService {
    constructor(@InjectRepository(Recipe) private recipeRepository: Repository<Recipe>) { }

    async create(createRecipeDto: CreateRecipeDto, user: User): Promise<Recipe> {
        const recipe = this.recipeRepository.create(createRecipeDto);
        recipe.user = user;
        return this.recipeRepository.save(recipe);
    }

    async findAll(): Promise<Recipe[]> {
        return this.recipeRepository.find({ relations: ['user'] });
    }

    async findOne(id: number): Promise<Recipe> {
        const recipe = await this.recipeRepository.findOne({ where: { id }, relations: ['user'] });
        if (!recipe) {
            throw new NotFoundException('Recipe not found');
        }
        return recipe;
    }

    async findUserRecipes(userId: number): Promise<Recipe[]> {
        return this.recipeRepository.find({ where: { userId }, relations: ['user'] });
    }

    async update(id: number, updateRecipeDto: UpdateRecipeDto, userId: number): Promise<Recipe> {
        const recipe = await this.findOne(id);

        if (recipe.userId !== userId) {
            throw new ForbiddenException('You do not have permission to update this recipe');
        }

        Object.assign(recipe, updateRecipeDto);
        return this.recipeRepository.save(recipe);
    }

    async remove(id: number, userId: number): Promise<void> {
        const recipe = await this.findOne(id);

        if (recipe.userId !== userId) {
            throw new ForbiddenException('You do not have permission to delete this recipe');
        }

        await this.recipeRepository.remove(recipe);
    }
}
