import { create } from "zustand";
import { SortOrder } from "@/graphql/generated";

type SortField = "createdAt" | "price";

export type Filters = {
  search: string;
  categoryIds: number[];
  sort: {
    field: SortField;
    order: SortOrder;
  };
};

type FilterState = {
  filters: Filters;
  selectedCategoryName: string | null;
  setCategory: (categoryId: number, categoryName: string) => void;
  setSearch: (search: string) => void;
  setSort: (field: SortField, order: SortOrder) => void;
  clearFilters: () => void;
};

const initialState: { filters: Filters; selectedCategoryName: string | null } =
  {
    filters: {
      search: "",
      categoryIds: [],
      sort: { field: "createdAt", order: SortOrder.Desc },
    },
    selectedCategoryName: null,
  };

export const useProductFilterStore = create<FilterState>()((set) => ({
  ...initialState,
  setCategory: (categoryId, categoryName) =>
    set({
      filters: {
        ...initialState.filters, // Reset other filters like search
        categoryIds: [categoryId],
      },
      selectedCategoryName: categoryName,
    }),
  setSearch: (search) =>
    set((state) => ({
      filters: { ...state.filters, search },
    })),
  setSort: (field, order) =>
    set((state) => ({
      filters: { ...state.filters, sort: { field, order } },
    })),
  clearFilters: () => set({ ...initialState }),
}));
