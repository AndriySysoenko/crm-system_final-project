import React from "react";
import { Metadata } from "next";
import Menu from '@/app/components/menu/Menu';
import Footer from '@/app/components/bottom/Footer';

export const metadata: Metadata = {
  title: "All Orders",
  description: "Generated а list of all orders",
};
type Props = {children: React.ReactNode}
const OrdersLayout = ({children}:Props) => {
  return (
    <div>
      <Menu/>
      {children}
      {/*<Footer/>*/}
    </div>
  )
}

export default OrdersLayout;