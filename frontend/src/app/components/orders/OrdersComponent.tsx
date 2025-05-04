import React, { FC } from 'react';
import { IOrder } from '@/app/models/IOrder';

type OrderProps = {item: IOrder};

const OrdersComponent:FC<OrderProps> = ({ item }) => {
  const renderValue = (value: string | number | null | undefined): string | number => {
    return value === null || value === undefined || value === '' ? 'null' : value;
  }

  return (
          <tr>
            <td>{renderValue(item.id)}</td>
            <td>{renderValue (item.name)}</td>
            <td>{renderValue (item.surname)}</td>
            <td>{renderValue (item.email)}</td>
            <td>{renderValue (item.phone)}</td>
            <td>{renderValue (item.age)}</td>
            <td>{renderValue (item.course)}</td>
            <td>{renderValue (item.course_format)}</td>
            <td>{renderValue (item.course_type)}</td>
            <td>{renderValue (item.status)}</td>
            <td>{renderValue (item.sum)}</td>
            <td>{renderValue (item.alreadyPaid)}</td>
            <td>{item.created_at ? new Date(item.created_at).toLocaleString(): 'null'}</td>
          </tr>
  );
}

export default OrdersComponent;