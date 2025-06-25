import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { jwtConfig } from "src/autenticacion/config/jwt.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: jwtConfig.verifyOptions.ignoreExpiration,
                secretOrKey: jwtConfig.secret, 
            })
    }

    async validate (payload: any){
        return {
            usu_id: payload.usu_id,
            per_id: payload.per_id
        }
    }
}