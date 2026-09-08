import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import connectDB from '../database';
import Category from '../models/Category';
import Product from '../models/Product';

const seed = async (): Promise<void> => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Category.deleteMany({});

    const categoryData = [
      {
        name: 'Electronics',
        slug: 'electronics',
      },
      {
        name: 'Clothing',
        slug: 'clothing',
      },
      {
        name: 'Books',
        slug: 'books',
      },
      {
        name: 'Home & Kitchen',
        slug: 'home-kitchen',
      },
      {
        name: 'Sports',
        slug: 'sports',
      },
    ];

    const categories = await Category.insertMany(categoryData);
    faker.seed(12345);

    const productData = [];

    for (const category of categories) {
      for (let i = 0; i < 5; i++) {
        productData.push({
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: Number(faker.commerce.price({ min: 10, max: 2000 })),
          category: category._id,
          stock: faker.number.int({ min: 0, max: 100 }),
          images: [faker.image.url()],
          sku: faker.string.alphanumeric({ length: 10, casing: 'upper' }),
          ratingsAverage: faker.number.float({
            min: 0,
            max: 5,
            fractionDigits: 1,
          }),
          isActive: faker.datatype.boolean({ probability: 0.9 }),
        });
      }
    }

    await Product.insertMany(productData);

    console.log(
      `Seeded ${categories.length} categories and ${productData.length} products.`
    );
  } catch (error) {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

void seed();
