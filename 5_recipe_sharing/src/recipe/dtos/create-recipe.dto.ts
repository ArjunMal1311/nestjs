import { IsString, IsNotEmpty, IsArray, ArrayMinSize, IsNumber, Min, Max, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { RecipeCategory } from '../recipe.entity';

class IngredientDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    quantity: string;

    @IsString()
    @IsNotEmpty()
    unit: string;
}

export class CreateRecipeDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    @Type(() => IngredientDto)
    ingredients: IngredientDto[];

    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    instructions: string[];

    @IsNumber()
    @Min(0)
    preparationTime: number;

    @IsNumber()
    @Min(0)
    cookingTime: number;

    @IsNumber()
    @Min(1)
    servings: number;

    @IsEnum(RecipeCategory)
    category: RecipeCategory;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
}