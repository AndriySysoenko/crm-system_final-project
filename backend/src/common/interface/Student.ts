import { Document } from 'mongoose';

export type StudentType = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  course: string;
  course_format: string;
  course_type: string;
  sum: number | null;
  already_paid: number | null;
  created_at: Date;
  utm: string;
  msg: string | null;
  status: string | null;
} & Document;
