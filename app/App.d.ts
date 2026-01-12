
export type PickRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type Paging = {
    page: number;
    perPage: number;
};
