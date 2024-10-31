import { makeAutoObservable, configure } from "mobx";

configure({
  enforceActions: "never",
});

class ItemStore {
  items: any[] = [];
  totalCount: number = 0;
  page: number = 1;
  editingItem: number | null = null;
  temporaryName: string = "";
  pageSize: number = 80;

  sortField: string = "name";
  sortOrder: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSortOrder(order: string) {
    this.sortOrder = order;
    this.sortItems();
  }

  sortItems() {
    this.items = this.items.slice().sort((a, b) => {
      if (this.sortOrder === "asc") {
        return a[this.sortField] > b[this.sortField] ? 1 : -1;
      } else {
        return a[this.sortField] < b[this.sortField] ? 1 : -1;
      }
    });
  }

  loadMore(currentPage: number) {
    this.page = currentPage;
    this.loadItems();
  }

  async loadItems() {
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${this.page}&per_page=${this.pageSize}`
      );
      const data = await response.json();
      this.items.push(...data.items);
      this.totalCount = data.total_count;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  deleteItem(id: number) {
    this.items = this.items.filter((item: any) => item.id !== id);
  }

  startEditing(id: number) {
    this.editingItem = id;
    const item = this.items.find((item) => item.id === id);
    if (item) this.temporaryName = item.name;
  }

  saveChanges(id: number) {
    this.items = this.items.map((item: any) =>
      item.id === id ? { ...item, name: this.temporaryName } : item
    );
    this.editingItem = null;
    this.temporaryName = "";
  }

  cancelEditing() {
    this.editingItem = null;
    this.temporaryName = "";
  }

  setTemporaryName(name: string) {
    this.temporaryName = name;
  }
}

export const itemStore = new ItemStore();
