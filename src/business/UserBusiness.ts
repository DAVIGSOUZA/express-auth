import { UserDatabase } from "../db/UserDatabase";
import { SignupInputDTO } from "../dto/signup.dto";
import { AppError } from "../error/AppError";
import { encrypt } from "../helpers/encryption";
import { generateId } from "../helpers/generatedId";
import { createToken } from "../helpers/token";

export class UserBusiness {
  constructor (
    private userDatabase: UserDatabase
  ){}

  public signup = async (input: SignupInputDTO) => {
    const { name, email, password } = input
    
    const userEmailExists = await this.userDatabase.getUserByEmail(email)

    if (userEmailExists.length > 0) {
      throw new AppError(400, 'Usuário já cadastrado')
    }

    const id = generateId()

    const hashedPassword = await encrypt(password)

    const newUser = await this.userDatabase.createUser({
      id,
      name,
      email,
      role: 'NORMAL',
      password: hashedPassword
    })

    const tokenPayload = {
      id: newUser.id,
      name: newUser.name,
      role: newUser.role
    }

    const token = createToken(tokenPayload)

    return {
      message: 'Cadastro realizado com sucesso',
      token
    }
  }
}