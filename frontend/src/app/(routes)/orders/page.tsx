import React, { FC } from 'react';
import { getOrders } from '@/app/service/api.service';
import OrdersComponent from '@/app/components/orders/OrdersComponent';
import PaginationComponent from '@/app/components/pagination/PaginationComponent';
import Link from 'next/link';

type SearchParams = { page?: string, sort?: string, field?: string, search?: string };
type MyProps = {
  searchParams: Promise<SearchParams>
}

const OrdersPage:FC<MyProps> =async ({ searchParams }) => {
  const params = await searchParams;
  const sort = params.sort;
  const page: number = params.page ? +params.page : 1;
  const result = await getOrders(page, sort);
  if(!result.data || result.data.length === 0) {
    return <div>No orders</div>
  }

  const getNextSort = (fieldName: string) => {
    if (fieldName === sort) return `-${fieldName}`;
    else {
      return fieldName;
    }
  }

  const buildSortUrl = (fieldName: string) => {
    const params = new URLSearchParams({
      page: page.toString(),
      sort: getNextSort(fieldName),
    });
    return `/orders?${params}`;
  };



  return (
    <div>
      <table className="table-auto w-full border">
      <thead>
      <tr>
        <th><Link href={buildSortUrl('id')}>id</Link></th>
        <th><Link href={buildSortUrl('name')}>name</Link></th>
        <th><Link href={buildSortUrl('surname')}>surname</Link></th>
        <th><Link href={buildSortUrl('email')}>email</Link></th>
        <th><Link href={buildSortUrl('phone')}>phone</Link></th>
        <th><Link href={buildSortUrl('age')}>age</Link></th>
        <th><Link href={buildSortUrl('course')}>course</Link></th>
        <th><Link href={buildSortUrl('course_format')}>course_format</Link></th>
        <th><Link href={buildSortUrl('course_type')}>course_type</Link></th>
        <th><Link href={buildSortUrl('status')}>status</Link></th>
        <th><Link href={buildSortUrl('sum')}>sum</Link></th>
        <th><Link href={buildSortUrl('alreadyPaid')}>alreadyPaid</Link></th>
        <th><Link href={buildSortUrl('group')}>group</Link></th>
        <th><Link href={buildSortUrl('created_at')}>created_at</Link></th>
        <th><Link href={buildSortUrl('manager')}>manager</Link></th>
      </tr>
      </thead>
      <tbody>
    {result.data.map((order, index) => (
      <OrdersComponent item={order} key={order._id?.toString() || `order-${index}`} />
    ))}
      </tbody>
      </table>
      <PaginationComponent currentPage={page} totalPages={result.pages} basePath={'/orders'} queryParams={sort ? { sort } : {} } />
    </div>
  );
}


export default OrdersPage;