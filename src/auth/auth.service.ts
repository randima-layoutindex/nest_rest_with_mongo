import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from "bcryptjs"
import { SignUpDto } from './dto/signup.dto';
import {JwtService} from "@nestjs/jwt"
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>,
        private jwtService:JwtService
    ){}

    async signUp(signUpDto:SignUpDto):Promise<{token:string}>{
        const {name,email,password} = signUpDto
        
        const hashedPassword = await bcrypt.hash(password,12)

        const user = await this.userModel.create({
            name,
            email,
            password:hashedPassword
        })

        const token = this.jwtService.sign({id:user._id})

        return {token}
    }

    async login(loginDto:LoginDto):Promise<{token:string}>{
        const {email,password} = loginDto
        const user = await (await this.userModel.findOne({email}))
        console.log(user)

        if(!user){
            throw new UnauthorizedException("Invalid email or password")
        }

        const isPasswordMatched = await bcrypt.compare(password,user.password)

        if(!isPasswordMatched){
            throw new UnauthorizedException("Invalid email or Password")
        }

        const token = await this.jwtService.sign({id:user._id})

        return {token}
    }
}
