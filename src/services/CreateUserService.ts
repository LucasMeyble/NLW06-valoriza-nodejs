import { UsersRepositories } from "../repositories/UsersRepositories"

interface UserRequest {

    name: string;
    email: string;
    admin?: boolean;

}

class CreateUserService{

    async execute({name, email, admin}: UserRequest) {
        const usersRepository = new UsersRepositories();

        if(!email){
            throw new Error("Email incorreto")
        }

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists){
            throw new Error("User already exists")
        }

        const user = usersRepository.create({
            name,
            email,
            admin
        });

        await usersRepository.save(user);

        return user;
    }

}

export { CreateUserService }