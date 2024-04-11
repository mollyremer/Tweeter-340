import { DAOFactory } from "../../dao/djangoDao/DAOFactory";

export class Service{
    protected DAO: DAOFactory = new DAOFactory;

    public async authenticateUser(
        alias: string,
        password: string
    ): Promise<void>{
        let realPassword = await this.DAO.userDAO.getPassword(alias);

        if (realPassword != password){
            throw new Error("[Bad Request] Invalid username or password");
        }
    }
}