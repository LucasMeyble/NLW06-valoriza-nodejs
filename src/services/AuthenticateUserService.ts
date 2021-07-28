import { getCustomRepository } from "typeorm";

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService{

    async execute({email, password}: IAuthenticateRequest) {

        const usersRepositories = getCustomRepository(UsersRepositories);

        //verifica se email existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user){
            throw new Error("email/password incorrect");
        }

        //verificar se senha esta correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("email/password incorrect");
        }

        //gerar token
        const token = sign({
            email: user.email
        }, "484a7c311864834e9827a313e78cf575",{
            subject: user.id,
            expiresIn: "1d"
        }
        );

        return token;

    }

}

export { AuthenticateUserService }
