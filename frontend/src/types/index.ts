export interface StorePrice {
  id: number;
  price: number;
  unitPrice: string;
  inStock: boolean;
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  category: string;
  swaps: Record<string, string>;
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Recipe {
  emoji: string;
  tag: string;
  time: string;
  rating: number;
  reviews: number;
  difficulty: string;
  servings: number;
  badge: string | null;
  gradient: string;
  nutrition: Nutrition;
  ingredients: Ingredient[];
  walmart: StorePrice[];
  sams: StorePrice[];
}

export type RecipeMap = Record<string, Recipe>;
