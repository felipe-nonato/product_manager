import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsUUID()
    parentId?: string;
}
