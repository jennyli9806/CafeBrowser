const HOME = 'main';
const HOME_SOURCE = `${HOME}/ncms`;
const HOME_PIAM = `${HOME}/piam`;
const SEARCH = 'search';
const SEARCH_SOURCE = `${SEARCH}/:id3`
const SALES_ORDER = 'sales-order';
const SKUS = 'sku';
const SEARCH_RESULTS = `${SEARCH_SOURCE}/:id`;
const SKU_DETAILS = `${SKUS}/:id3/:id/depots`;
const SKU_DETAILS_LIST = `${SKU_DETAILS}/list`;
const SKU_DETAILS_MAP = `${SKU_DETAILS}/map`;
const SKU_PICKUP = `${SKU_DETAILS}/:id2/pick-up`;
const SKU_DELIVERY = `${SKU_DETAILS}/:id2/delivery`;
const SKU_PICKUP_ORDER = `${SKU_DETAILS}/:id2/sales-order`;
const RECENT_ORDER_HISTORY = `history`;
const FAVORITES = `favorites/:id3`;
const DEPOT_DETAILS =`${SKU_DETAILS}/:id2/details`;

export const ROUTE_CONSTANTS = {
  HOME,
  HOME_SOURCE,
  HOME_PIAM,
  SEARCH,
  SEARCH_SOURCE,
  SALES_ORDER,
  SKUS,
  SEARCH_RESULTS,
  SKU_DETAILS,
  SKU_DETAILS_LIST,
  SKU_DETAILS_MAP,
  SKU_PICKUP,
  SKU_DELIVERY,
  SKU_PICKUP_ORDER,
  RECENT_ORDER_HISTORY,
  FAVORITES,
  DEPOT_DETAILS
};
