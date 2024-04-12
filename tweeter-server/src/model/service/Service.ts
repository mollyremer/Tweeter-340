import { AuthToken, User } from "tweeter-shared";
import { DAOFactoryInterface } from "../../dao/djangoDao/DAOFactory";

export class Service {
    protected DAO: DAOFactoryInterface;

    constructor(DAO: DAOFactoryInterface){
        this.DAO = DAO;
    }

    public async authenticateUser(
        alias: string,
        password: string
    ): Promise<User> {
        console.log("Authenticating user....");
        const user = await this.DAO.userDAO.getUser(alias);
        const hash = await this.DAO.userDAO.getPassword(alias);
        const salt = await this.DAO.userDAO.getSalt(alias);

        if (user === null) {
            throw new Error("[Bad Request] User not found");
        }

        let bcrypt = require('bcryptjs');
        let authenticated = bcrypt.compareSync(password, hash);

        if (!authenticated) {
            throw new Error("[Bad Request] Invalid username or password");
        } else {
            console.log("Authenticated");
        }

        return user;
    }

    public async validateAuthToken(
        authToken: AuthToken
    ) {
        console.log("validating auth token...");
        console.log(authToken);
        let databaseAuthToken = await this.DAO.authDAO.get(authToken.token);
        console.log(databaseAuthToken);
        if ((databaseAuthToken === null) || (databaseAuthToken?.timestamp === undefined)) { throw new Error("[Bad Request] Invalid authToken, please log back in"); }

        let currentTime = new Date().getTime();
        let difference = currentTime - databaseAuthToken?.timestamp;

        // Number of milliseconds in a day 
        const oneDayInMilliseconds: number = 24 * 60 * 60 * 1000;

        // Check if the difference is greater than one day
        if (difference > oneDayInMilliseconds) {
            throw new Error("[Bad Request] Authtoken is more than a day old, please log back in");
        } else {
            console.log("validated");
        }
    }
}