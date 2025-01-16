// {
//     "id": 4,
//     "name": "Product Name v2",
//     "description": "Product Description",
//     "slug": "product-name",
//     "image": "image-url.jpg",
//     "provider": "Provider Name",
//     "status": {
//     "id": 2,
//         "name": "publicado"
// },
//     "category": {
//     "id": 2,
//         "name": "Hogar y muebles"
// }
// }

export interface IProduct {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    provider: string;
    status: {
        id: number;
        name: string;
    };
    category: {
        id: number;
        name: string;
    }
}

export interface IResponseGetProducts {
    data: IProduct[];
    message: string;
    status: boolean;
}

export interface IProductStatus {
    id: number;
    name: string;
}

export interface  IResponseGetStatuses {
    data: IProductStatus[];
    message: string;
    status: boolean;
}

export interface IProductCategory {
    id: number;
    name: string;
}

export interface IResponseGetCategories {
    data: IProductCategory[];
    message: string;
    status: boolean;
}

export interface IStoreProduct {
    name: string;
    description: string;
    image: string;
    statusId: number;
    categoryId: number;
    provider: string;
}

export interface IResponseGetProductDetails {
    data: IProduct;
    message: string;
    status: boolean;
}
