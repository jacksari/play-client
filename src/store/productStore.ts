import useLoading from "@/composables/useLoading";
import useToast from "@/composables/useToast";
import { defineStore } from "pinia";
import productService from "~/services/productService";
import type {
    IProduct,
    IProductStatus,
    IResponseGetProductDetails,
    IResponseGetProducts,
    IResponseGetStatuses
} from "~/interfaces/product";

const { toggle } = useToast();
const { isPreloading } = useLoading();
// const { showConfirmSwal } = useSwal();

export const useProductStore = defineStore("product", () => {

    const products = ref<IProduct[]>([]);
    const statuses = ref<IProductStatus[]>([]);
    const categories = ref<IProductCategory[]>([]);

    const storeProduct = ref<{
        id?: number | undefined | null;
        name: string | null;
        description: string | null;
        statusId: number | null;
        categoryId: number | null;
        provider: string | null;
    }>({
        id: null,
        name: null,
        description: null,
        statusId: 1,
        categoryId: null,
        provider: null
    })

    const getProducts = async () => {
        const resp: IResponseGetProducts = await productService.index()
        products.value = resp.data
        // toggle(resp.message);
    }

    const getStatuses = async () => {
        const resp: IResponseGetStatuses = await productService.getStatuses()
        statuses.value = resp.data
    }

    const getCategories = async () => {
        const resp: IResponseGetCategories = await productService.getCategories()
        categories.value = resp.data
    }

    const saveProduct = async (
        refresh = () => {}
    ) => {

        if(!storeProduct.value.name ||
        !storeProduct.value.description ||
        !storeProduct.value.statusId ||
        !storeProduct.value.categoryId ||
        !storeProduct.value.provider) {
            return toggle("Se deben enviar todos los datos", ToastType.ERROR);
        }

        const resp = await productService.storeProduct({
            name: storeProduct.value.name,
            description: storeProduct.value.description,
            statusId: 1,
            categoryId: storeProduct.value.categoryId,
            provider: storeProduct.value.provider,
            image: 'https://picsum.photos/200/300'
        })
        if(resp.status) {
            refresh()
            toggle(resp.message);
            await getProducts()
        }
    }

    const clearFormProducts = async () => {
        storeProduct.value.name = null;
        storeProduct.value.description = null;
        storeProduct.value.categoryId = null;
        storeProduct.value.provider = null;
        storeProduct.value.statusId = 1;
        storeProduct.value.id = null;
    }

    const deleteProduct = async (id: number) => {
        const resp = await productService.delete(id);

        if(resp.status) {
            toggle(resp.message);
            await getProducts()
        }
    }

    const getDetailsProductById = async (productId: number) => {
        const {data: { id, name, description, image, provider, status, price, category}}: IResponseGetProductDetails = await productService.getProductById(productId);
        storeProduct.value = {
            name,
            description,
            provider,
            statusId: status.id,
            categoryId: category.id,
            id
        }
    }

    const editProduct = async (
        refresh = () => {}
    ) => {

        if(!storeProduct.value.name ||
            !storeProduct.value.description ||
            !storeProduct.value.statusId ||
            !storeProduct.value.categoryId ||
            !storeProduct.value.provider||
        !storeProduct.value.statusId ) {
            return toggle("Se deben enviar todos los datos", ToastType.ERROR);
        }

        const resp = await productService.updateProduct({
            name: storeProduct.value.name,
            description: storeProduct.value.description,
            statusId: storeProduct.value.statusId,
            categoryId: storeProduct.value.categoryId,
            provider: storeProduct.value.provider,
            image: 'https://picsum.photos/200/300'
        }, storeProduct.value.id)
        if(resp.status) {
            refresh()
            toggle(resp.message);
            await getProducts()
        }
    }


    return {
        products,
        statuses,
        categories,
        storeProduct,
        getProducts,
        getStatuses,
        getCategories,
        saveProduct,
        clearFormProducts,
        deleteProduct,
        getDetailsProductById,
        editProduct
    };
});
