'use client';

import React, { useEffect, useState } from 'react';
import { getOrders } from '@/app/service/api.service';
import OrderComponent from '@/app/components/order/OrderComponent';
import PaginationComponent from '@/app/components/pagination/PaginationComponent';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { IOrder } from '@/app/models/IOrder';
import styles from './TableStyle.module.css'

const OrderListComponent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname(); // потрібно для ефективного трекінгу змін

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    const sort = searchParams.get('sort') || undefined;

    setLoading(true);
    getOrders(page, sort).then(result => {
      setOrders(result.data || []);
      setPages(result.pages || 1);
      setLoading(false);
    });
  }, [searchParams, pathname]); // реагує на зміну URL

  const page = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || undefined;

  const getNextSort = (fieldName: string) => {
    return fieldName === sort ? `-${fieldName}` : fieldName;
  };

  const buildSortUrl = (fieldName: string) => {
    const params = new URLSearchParams({
      page: page.toString(),
      sort: getNextSort(fieldName),
    });
    return `/orders?${params}`;
  };
  if (loading) return <div>Loading...</div>;
  if (!orders.length) return <div>No orders</div>;

  return (
    <div>
      <table className={styles.allTable}>
        <thead className={styles.header}>
        <tr>
          <th ><Link href={buildSortUrl('id')}>id</Link></th>
          <th ><Link href={buildSortUrl('name')}>name</Link></th>
          <th><Link href={buildSortUrl('surname')}>surname</Link></th>
          <th ><Link href={buildSortUrl('email')}>email</Link></th>
          <th><Link href={buildSortUrl('phone')}>phone</Link></th>
          <th><Link href={buildSortUrl('age')}>age</Link></th>
          <th><Link href={buildSortUrl('course')}>course</Link></th>
          <th ><Link href={buildSortUrl('course_format')}>course_format</Link></th>
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
        {orders.map((order, index) => (
          <OrderComponent item={order} key={order.id?.toString() || `order-${index}`} />
        ))}
        </tbody>
      </table>
      <PaginationComponent currentPage={page} totalPages={pages} basePath={'/orders'} queryParams={sort ? { sort } : {} } />
    </div>
  );
}


export default OrderListComponent;