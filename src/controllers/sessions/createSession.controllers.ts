import { Request, Response } from 'express'
import { ISessionRequest } from '../../interfaces/session.interfaces'
import createSessionService from '../../services/sessions/createSession.services'

const createSessionController = async (req: Request, res: Response) => {
    const data: ISessionRequest = req.body
    const token = await createSessionService(data)
    return res.status(200).json({token})
}

export default createSessionController;