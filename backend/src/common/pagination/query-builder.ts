import { ReqQueryDto } from './pagination.query.dto';
import { FilterQuery, QueryOptions } from 'mongoose';

export function builderQuery<T>(query: ReqQueryDto): {
  filter: FilterQuery<T>;
  options: QueryOptions;
} {
  const filter: FilterQuery<T> = {};
  const { page = 1, limit = 25, sort, search, field } = query;

  if (search && field) {
    const fields = field.split(',');
    filter.$or = fields.map((f) => ({
      [f]: {
        $regex: search,
        $options: 'i',
      },
    })) as any;
  }

  const excludeKey = ['page', 'limit', 'sort', 'search', 'field', 'onlyMy'];
  Object.keys(query).forEach((key) => {
    if (!excludeKey.includes(key)) {
      filter[key as keyof T] = query[key];
    }
  });

  const options: QueryOptions = {
    skip: (page - 1) * limit,
    limit: limit,
    sort:
      sort && sort.trim() !== ''
        ? {
            [sort.replace('-', '')]: sort.startsWith('-') ? -1 : 1,
          }
        : {created_at: -1 },
  };
  return { filter, options };
}
