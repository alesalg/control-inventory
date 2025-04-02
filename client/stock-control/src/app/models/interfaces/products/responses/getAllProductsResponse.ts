export interface GetAllProductsResponse {
    id: string;
    name: string;
    amount: number;
    description: string;
    price: string;
    category: {
        id: string;
        name: string
    }
}

export interface DeleteProductResponse {
    id: string;
    name: string;
    price: string;
    description: string,
    amount: number;
    category_id: string
}

export interface CreateProductRequest {
    name: string;
    price: string;
    description: string;
    category_id: string;
    amount: number
}

export interface CreateProductResponse {
    id: string;
    name: string;
    price: string;
    description: string;
    amount: number;
    category_id: string
}