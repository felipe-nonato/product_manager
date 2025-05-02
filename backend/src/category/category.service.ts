import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

import { CreateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return this.prisma.category.findMany();
    }

    async findOne(id: string) {
        const category = await this.prisma.category.findUnique({
            where: { id },
        });
        if (!category) {
            throw new NotFoundException(`Category with ID "${id}" not found`);
        }
        return category;
    }

    async create(createCategoryDto: CreateCategoryDto) {
        return this.prisma.category.create({
            data: {
                name: createCategoryDto.name,
                parentId: createCategoryDto.parentId,
            },
        });
    }

    async update(id: string, updateCategoryDto: CreateCategoryDto) {
        const category = await this.findOne(id);
        return this.prisma.category.update({
            where: { id },
            data: {
                name: updateCategoryDto.name,
                parentId: updateCategoryDto.parentId,
            },
        });
    }

    async remove(id: string) {
        const category = await this.findOne(id);
        return this.prisma.category.delete({
            where: { id },
        });
    }
}
