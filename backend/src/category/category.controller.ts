import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../../generated/prisma';
import { CreateCategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Category> {
        return this.categoryService.findOne(id);
    }

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryService.create(createCategoryDto);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCategoryDto: CreateCategoryDto,
    ): Promise<Category> {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Category> {
        return this.categoryService.remove(id);
    }
}
