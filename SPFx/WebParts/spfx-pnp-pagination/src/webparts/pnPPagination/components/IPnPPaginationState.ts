import { ISPItem } from '../models/ISPItem';

export interface IPnPPaginationState {
    allItems: ISPItem[];
    paginatedItems: ISPItem[]; 
}