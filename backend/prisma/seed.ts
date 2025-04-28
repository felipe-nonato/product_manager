import { PrismaClient } from '../generated/prisma';
import { faker } from '@faker-js/faker';

// Inicializar o Prisma Client
const prisma = new PrismaClient();

// Configurações de quantidade
const NUM_CATEGORIES = 10;
const NUM_SUBCATEGORIES = 3; // Por categoria principal
const NUM_PRODUCTS = 100;
const MAX_CATEGORIES_PER_PRODUCT = 3;

async function main() {
    console.log('🌱 Iniciando o seed do banco de dados...');

    // Limpar dados existentes
    console.log('🧹 Limpando dados existentes...');
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    // Criar categorias principais
    console.log('📁 Criando categorias principais...');
    const mainCategories: { id: string; parentId: string | null; name: string }[] = [];
    for (let i = 0; i < NUM_CATEGORIES; i++) {
        const category = await prisma.category.create({
            data: {
                name: faker.commerce.department(),
            },
        });
        mainCategories.push(category);
        console.log(`   ✅ Categoria criada: ${category.name}`);
    }

    // Criar subcategorias
    console.log('📂 Criando subcategorias...');
    const allCategories: { id: string; parentId: string | null; name: string }[] = [
        ...mainCategories,
    ];
    for (const mainCategory of mainCategories) {
        for (let i = 0; i < NUM_SUBCATEGORIES; i++) {
            const subcategory = await prisma.category.create({
                data: {
                    name: faker.commerce.productAdjective() + ' ' + mainCategory.name,
                    parentId: mainCategory.id,
                },
            });
            allCategories.push(subcategory);
            console.log(
                `   ✅ Subcategoria criada: ${subcategory.name} (pai: ${mainCategory.name})`,
            );
        }
    }

    // Criar produtos
    console.log('🛍️ Criando produtos...');
    for (let i = 0; i < NUM_PRODUCTS; i++) {
        // Selecionar categorias aleatórias para este produto
        const numCategories = Math.floor(Math.random() * MAX_CATEGORIES_PER_PRODUCT) + 1;
        const selectedCategoryIds = new Set();

        while (selectedCategoryIds.size < numCategories) {
            const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
            selectedCategoryIds.add(randomCategory.id);
        }

        // Criar produto com as categorias selecionadas
        const product = await prisma.product.create({
            data: {
                name: faker.commerce.productName(),
                qty: faker.number.int({ min: 1, max: 1000 }),
                price: parseFloat(faker.commerce.price({ min: 1, max: 1000 })),
                photo: faker.image.url(),
                categories: {
                    connect: Array.from(selectedCategoryIds).map(id => ({ id: id as string })),
                },
            },
        });

        console.log(
            `   ✅ Produto criado: ${product.name} - $${product.price} (${product.qty} em estoque)`,
        );
    }

    // Estatísticas finais
    const categoryCount = await prisma.category.count();
    const productCount = await prisma.product.count();

    console.log('\n🌟 Seed concluído com sucesso!');
    console.log(`📊 Estatísticas:`);
    console.log(`   - ${categoryCount} categorias criadas`);
    console.log(`   - ${productCount} produtos criados`);
}

// Executar o seed
main()
    .catch(error => {
        console.error('❌ Erro durante o seed:');
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        // Fechar conexão com o banco de dados
        await prisma.$disconnect();
        console.log('🔌 Conexão com o banco de dados fechada.');
    });
