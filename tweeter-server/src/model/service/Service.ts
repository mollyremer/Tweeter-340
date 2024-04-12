import { User } from "tweeter-shared";
import { DAOFactory } from "../../dao/djangoDao/DAOFactory";

export class Service{
    protected DAO: DAOFactory = new DAOFactory;

    public async authenticateUser(
        alias: string,
        password: string
    ): Promise<User>{
        const user = await this.DAO.userDAO.getUser(alias);
        const realPassword = await this.DAO.userDAO.getPassword(alias);
        const salt = await this.DAO.userDAO.getSalt(alias);

        if (user === null) {
            throw new Error("[Bad Request] User not found");
        }

        const hash = CryptoJS.SHA256(password + salt);
        const hashedPassword = hash.toString(CryptoJS.enc.Base64);

        const authenticated = (hashedPassword === realPassword);

        if (!authenticated) {
            throw new Error("[Bad Request] Invalid username or password");
        }

        return user;
    }
}