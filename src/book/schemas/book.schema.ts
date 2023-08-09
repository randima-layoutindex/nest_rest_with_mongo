import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";


export enum Category{
    ADVENTURE = "Adventure",
    CLASSIC = "Classic",
    CRIME = "Crime",
    FANTASY="Fantasy"
}


@Schema({
    timestamps:true
})

export class Book{
    @Prop()
    title:String;
    @Prop()
    description:String;
    @Prop()
    aurthor:String;
    @Prop()
    price:Number;
    @Prop()
    category:Category
    @Prop({type:mongoose.Schema.ObjectId,ref:"User"})
    user:User

}

export const BookSchema = SchemaFactory.createForClass(Book)