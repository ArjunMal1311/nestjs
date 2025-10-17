import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';

import { JwtAuthGuard } from '../user/auth.guard';
import { CurrentUser } from '../user/current-user.decorator';
import { User } from '../user/user.entity';
import { ReviewService } from 'src/review/review.service';
import { CreateReviewDto } from 'src/review/dtos/create-review.dto';
import { Review } from 'src/review/review.entity';
import { UpdateReviewDto } from 'src/review/dtos/update-review.dto';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createReviewDto: CreateReviewDto, @CurrentUser() user: User): Promise<Review> {
        return this.reviewService.create(createReviewDto, user);
    }

    @Get('recipe/:recipeId')
    async findAllByRecipe(@Param('recipeId') recipeId: string): Promise<Review[]> {
        return this.reviewService.findAllByRecipe(+recipeId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Review> {
        return this.reviewService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto, @CurrentUser() user: User): Promise<Review> {
        return this.reviewService.update(+id, updateReviewDto, user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
        await this.reviewService.remove(+id, user.id);
    }
}
