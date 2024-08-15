// utils/billUtils.ts

import { Food } from "../pages/BillDetail/BillDetail";

export const calculateTotalQuantity = (foods: Food[]): number => {
  return foods.reduce((acc, food) => acc + food.quantity, 0);
};

export const calculateTotalAmount = (foods: Food[]): number => {
  return foods.reduce((acc, food) => acc + food.quantity * food.food.price, 0);
};
