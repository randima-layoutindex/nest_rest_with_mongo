import { IsOptional ,IsString,IsNumber,IsEnum,IsEmpty} from "class-validator";
import { Category } from "../schemas/book.schema";
import { User } from "src/auth/schemas/user.schema";
import { isEmpty } from "rxjs";

export class UpdateBookDto{
    @IsOptional()
    @IsString()
    readonly title:string;
    @IsOptional()
    @IsString()
    readonly description:string;
    @IsOptional()
    @IsString()
    readonly aurthor:string;
    @IsOptional()
    @IsNumber()
    readonly price:number;
    @IsOptional()
    @IsEnum({message:"Please select a correct category"})
    readonly category:Category;
    @IsEmpty({message:"You cannot pass user id"})
    readonly user:User
}