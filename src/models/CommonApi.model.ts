export interface CommonApiRequestParams {
  // GET /posts?title=json-server&author=typicode
  // GET /posts?id=1&id=2
  // GET /comments?author.name=typicode

  // paginate
  _page?: number;
  _limit?: number; // 10 by default

  // sort
  _sort?: string;
  _order?: 'asc' | 'desc'; // "asc" by default

  // slice
  _start?: number;
  _end?: number;

  // operators
  // views_gte?: number; // for getting a range
  // views_lte?: number;
  // id_ne?: 1; // to exclude a value
  // title_like?: string; // to filter (RegExp supported)

  // full-text search
  q?: string;

  // relationships
  _embed?: string; // To include children resources
  _expand?: string; // To include parent resource
}
