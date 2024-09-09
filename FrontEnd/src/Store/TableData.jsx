import { atom } from 'recoil';
export const paginationState = atom({
  key: 'paginationState',
  default: {
    pageIndex: 0,
    pageSize: 10,
  },
});

export const tableDataState = atom({
  key: 'tableDataState',
  default: [],
});
