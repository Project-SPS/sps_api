import { AppDataSource } from "../../data-source";
import { Policial } from "../../entity/Policial.entity";
import { ISessionRequest } from "../../interfaces/session.interfaces";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import 'dotenv/config'

const createSessionService = async ({cod_registro, senha}: ISessionRequest): Promise<string> => {
    
    const policialRepository = AppDataSource.getRepository(Policial);

    const policial = await policialRepository.findOneBy({
        cod_registro: cod_registro
    });

    if(!policial) {
        throw new AppError('Invalid user or password', 401);
    }
    
    const passwordMatch = await compare(senha, policial.senha);

    if(!passwordMatch) {
        throw new AppError('Invalid user or password', 401);
    }

    const token = jwt.sign({
        administrador: policial.administrador
    },
    process.env.SECRET_KEY as string,
    {
        expiresIn: '24h',
        subject: policial.id
    });

    return token;
}

export default createSessionService;