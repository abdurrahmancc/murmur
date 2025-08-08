export class PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;

  constructor(items: T[], totalItems: number, page: number, pageSize: number) {
    this.items = items;
    this.totalItems = totalItems;
    this.pageNumber = page;
    this.pageSize = pageSize;
    this.totalPages = Math.ceil(totalItems / pageSize);

    const maxPagesToShow = 5;
    let start = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let end = Math.min(start + maxPagesToShow - 1, this.totalPages);

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    this.startPage = start;
    this.endPage = end;
  }
}
