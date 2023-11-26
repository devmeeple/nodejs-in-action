import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        // 쿠키가 있으면 인증된 것
        if (request.cookies['login']) {
            return true;
        }

        // 쿠키가 없으면 request의 body 정보 확인
        if (!request.body.email || !request.body.password) {
            return false;
        }

        // 인증 로직은 기존의 authService.validateUser 사용
        const user = await this.authService.validateUser(
            request.body.email,
            request.body.password,
        );

        // 유저 정보가 없으면 false 반환
        if (!user) {
            return false;
        }

        // 있으면 request에 user 정보를 추가하고 true 반환
        request.user = user;
        return true;
    }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated();
    }

}