export interface Rating {
    _id: string;
    images?: string;
    content?: string;
    rating: number;
    userId: string;
    restaurantId: string;
}
