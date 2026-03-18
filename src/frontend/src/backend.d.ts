import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: ProductId;
    imageUrls: Array<string>;
    name: string;
    createdAt: Time;
    description: string;
    stock: bigint;
    isFeatured: boolean;
    materials: Array<string>;
    category: CategoryId;
    rating: number;
    price: bigint;
    reviewCount: bigint;
    isBestSeller: boolean;
}
export interface Category {
    id: CategoryId;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
}
export type Time = bigint;
export interface WishlistItem {
    productId: ProductId;
}
export type CategoryId = string;
export type ProductId = string;
export interface CartItem {
    productId: ProductId;
    quantity: bigint;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addToCart(item: CartItem): Promise<void>;
    addToWishlist(item: WishlistItem): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    createCategory(category: Category): Promise<void>;
    createProduct(product: Product): Promise<void>;
    deleteCategory(id: CategoryId): Promise<void>;
    deleteProduct(id: ProductId): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getBestSellers(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getCategories(): Promise<Array<Category>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProduct(id: ProductId): Promise<Product>;
    getProductsByCategory(categoryId: string): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWishlist(): Promise<Array<WishlistItem>>;
    isCallerAdmin(): Promise<boolean>;
    removeFromCart(productId: ProductId): Promise<void>;
    removeFromWishlist(productId: ProductId): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateCartQuantity(productId: ProductId, quantity: bigint): Promise<void>;
    updateCategory(id: CategoryId, category: Category): Promise<void>;
    updateProduct(id: ProductId, product: Product): Promise<void>;
}
