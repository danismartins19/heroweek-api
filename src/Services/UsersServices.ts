import { hash } from "bcrypt";
import { ICreate } from "../Interfaces/UsersInterface"
import { UserRepository } from "../repositories/UsersRepository"

class UsersServices{
  private usersRepository : UserRepository
  constructor(){
    this.usersRepository = new UserRepository()
  }

  async create({name, email, password} : ICreate){
    const findUser = await this.usersRepository.findUserByEmail(email);
    if(findUser){
      throw new Error('User exists')
    }
    const hashPassword = await hash(password, 10);
    const create = await this.usersRepository.create({name, email, password: hashPassword })
    return create;
  }
}

export {UsersServices}