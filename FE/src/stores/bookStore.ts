import { create } from "zustand";

interface StoreState {
    booksItem: [];
    searchText: string;
    page: number;
    size: number;
    sort: string;
    order: string;
    selectedValue: string;
    keyword: string[];
    exactMatch: boolean;
    setBooksItem: (books: []) => void;
    setSearchText: (searchText: string) => void;
    setPage: (pageNum: number) => void;
    setSize: (size: number) => void;
    setSort: (type: string) => void;
    setOrder: (type: string) => void;
    setSelectedValue: (value: string) => void;
    setKeyword: (keyword: string[]) => void;
    setExactMatch: (isExactMatch: boolean) => void;
}

const useBookStore = create<StoreState>((set) => ({
    booksItem: [],
    searchText: "",
    page: 0,
    size: 20,
    sort: "",
    order: "",
    selectedValue: "title",
    keyword: [],
    exactMatch: false,
    setBooksItem: (books) => set({ booksItem: books }),
    setSearchText: (searchText) => set({ searchText }),
    setPage: (pageNum) => set({ page: pageNum }),
    setSize: (size) => set({ size }),
    setSort: (type) => set({ sort: type }),
    setOrder: (type) => set({ order: type }),
    setSelectedValue: (value) => set({ selectedValue: value }),
    setKeyword: (keywords) => set({ keyword: keywords }),
    setExactMatch: (isExactMatch) => set({ exactMatch: isExactMatch }),
}));

export default useBookStore;