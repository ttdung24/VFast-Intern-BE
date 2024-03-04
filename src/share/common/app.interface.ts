export interface IPaginateParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

export interface IResponseList<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPage: number;
}
