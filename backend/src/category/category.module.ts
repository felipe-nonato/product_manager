import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from '../database/prisma.service'; // Importe o PrismaService

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, PrismaService], // Adicione o PrismaService
    exports: [CategoryService], // Opcional: exporte o service se precisar usá-lo em outros módulos
})
export class CategoryModule {}
