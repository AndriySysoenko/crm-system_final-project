import React from "react";
import { Metadata } from "next";
import Menu from '@/app/components/menu/Menu';

export const metadata: Metadata = {
  title: "All Orders",
  description: "Generated а list of all orders",
};
type Props = {children: React.ReactNode}
const OrdersLayout = ({children}:Props) => {
  return (
    <div>

      {children}
    </div>
  )
}

export default OrdersLayout;