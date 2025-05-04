export interface IOrder {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  course: string;
  course_format: string;
  course_type: string;
  status: string;
  sum: number;
  alreadyPaid: number;
  created_at: string;
  utm?: string;
  msg?: string;
}