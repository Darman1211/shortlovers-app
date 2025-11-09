import { Categories } from "../types/collection_types.js";
import { BaseService } from "./BaseService.js";

export class CategoryService extends BaseService {
    async createCategoryIfNotExists(categoryName: string): Promise<number> {
        const categoryService = this.getItemsService<Categories>('categories');
        const categoriesData = await categoryService.readByQuery({ fields: ['*'], limit: -1 });

        const existingCategory = categoriesData.find(cat => cat.name.toLocaleLowerCase() === categoryName.toLocaleLowerCase())?.id;

        if (existingCategory) {
            return existingCategory;
        } else {
            const newCatId = await categoryService.createOne({ name: categoryName });
            return Number(newCatId);
        }
    }
}
