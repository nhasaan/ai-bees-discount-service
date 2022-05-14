import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Category } from './category.entity';

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Product {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: Category.name,
  })
  category: Types.ObjectId | Category;

  @Prop({ type: Number, default: 0 })
  discount: number;

  @Prop({ type: Number, default: 5 })
  price: number;

  @Prop({ type: Number, default: 10 })
  quantity: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.plugin(uniqueValidator);
