// import authApi from "@/config/axios";
// import { useApi } from "@/composables/useApi";
// import type { ServiceErrorResponse } from "@/interfaces/request";

const url = "/api/products";

class ProductService {
    async index(
    ): Promise<ServiceErrorResponse | any> {
        return await useApi(`${url}`);
    }

    async getStatuses(
    ): Promise<ServiceErrorResponse | any> {
        return await useApi(`${url}/statuses`);
    }

    async getCategories(
    ): Promise<ServiceErrorResponse | any> {
        return await useApi(`${url}/categories`);
    }

    async storeProduct(
        data: IStoreProduct,
    ): Promise<ServiceErrorResponse | any> {
        return await useApi(`${url}`, {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async delete(
        productId: number,
    ): Promise<ServiceErrorResponse | any> {
        return await useApi(`${url}/${productId}`, {
            method: "DELETE",
        });
    }

    async getProductById(
        productId: number,
    ): Promise<ServiceErrorResponse | any> {
        return await useApi(`${url}/${productId}`, {
            method: "GET",
        });
    }

    async updateProduct(
        data: IStoreProduct,
        productId: number,
    ): Promise<ServiceErrorResponse | any> {
        return await useApi(`${url}/${productId}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    }



}
export default new ProductService();
