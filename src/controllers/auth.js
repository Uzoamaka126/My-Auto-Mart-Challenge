import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const secretKey = process.env.JWT_SECRET;

class Auth {
    static async decodeToken(req) {
       try {
            if (!token) {
                throw new Error('No Token Provided');
            }
            const jwtToken = token.split(' ')[1];
            const decoded = await jwt.verify(jwtToken, secretKey);
            return decoded;
        } catch (error) {
            throw new Error('Auth Token is wrong!');
        }
    }

    static async verifyUser(req, res, next) {
        try {
            const decoded = await Auth.decodeToken(req);
            req.user = decoded.user;
            next();
            return true;
        } catch (error) {
            return res.status(401).json({
                status:'error',
                message: error.message,
            });
        }
    }

    static async verifyAdmin(req, res, next) {
        try {
            const decoded = await Auth.decodeToken(req);
            if (!decoded.isAdmin) {
                throw new Error('This page is unauthorized');
            }
            req.admin = decoded.admin;
            next();
            return true;
        } catch (error) {
            return res.status(401).json({
                status: 'error',
                message: error.message,
            });
        }
    }    
}

export default Auth;