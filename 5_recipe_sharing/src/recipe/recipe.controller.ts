import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { Recipe } from './recipe.entity';
import { JwtAuthGuard } from '../user/auth.guard';
import { CurrentUser } from '../user/current-user.decorator';
import { User } from '../user/user.entity';

@Controller('recipe')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createRecipeDto: CreateRecipeDto, @CurrentUser() user: User): Promise<Recipe> {
        return this.recipeService.create(createRecipeDto, user);
    }

    @Get()
    async findAll(): Promise<Recipe[]> {
        return this.recipeService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('my')
    async findUserRecipes(@CurrentUser() user: User): Promise<Recipe[]> {
        return this.recipeService.findUserRecipes(user.id);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Recipe> {
        return this.recipeService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto, @CurrentUser() user: User): Promise<Recipe> {
        return this.recipeService.update(+id, updateRecipeDto, user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
        await this.recipeService.remove(+id, user.id);
    }
}
