import {Body, Controller, Get, Post, Request, Response, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from '../user/user.dto';
import {AuthenticatedGuard, LoginGuard} from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() userDto: CreateUserDto) {
        return await this.authService.register(userDto);
    }

    @Post('login')
    async login(@Request() req, @Response() res) {
        const userInfo = await this.authService.validateUser(
            req.body.email,
            req.body.password
        );

        if (userInfo) {
            res.cookie('login', JSON.stringify(userInfo), {
                httpOnly: false,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
        }
        return res.send({
            message: 'login success'
        });
    }

    @UseGuards(LoginGuard)
    @Post('login2')
    async login2(@Request() req, @Response() res) {
        // 쿠키 정보는 없지만 request에 user 정보가 있다면 응답값에 쿠키 정보 추가
        if (!req.cookies['login'] && req.user) {
            // 응답에 쿠키 정보 추가
            res.cookie('login', JSON.stringify(req.user), {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7, // 1day
                // maxAge: 1000 * 10, // 로그인 테스트를 고려해 10초로 설정
            });
        }
        return res.send({
            message: 'login2 success'
        });
    }

    @UseGuards(LoginGuard)
    @Get('test-guard')
    testGuard() {
        return '로그인 성공 시 이 글이 보입니다.';
    }

    @UseGuards(AuthenticatedGuard)
    @Get('test-guard2')
    testGuardWithSession(@Request() req) {
        return req.user;
    }
}
