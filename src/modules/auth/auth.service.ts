import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  access_token_private_key,
  refresh_token_private_key,
} from 'src/constraints/jwt.constraint';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { ITokenResponse, TokenPayload } from './auth.interface';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RoleService } from '../role/role.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne({ email: email });
    if (!user) {
      throw new BadRequestException('Wrong email');
    }
    this.validateHashedContent(password, user.password);
    return user;
  }

  validateHashedContent(content: string, hashed_content: string): void {
    const compare = bcrypt.compareSync(content, hashed_content);
    if (!compare) {
      throw new BadRequestException();
    }
  }

  async login(user: User): Promise<ITokenResponse> {
    const access_token = this.generateAccessToken({
      id: user.id,
      email: user.email,
    });
    const refresh_token = this.generateRefreshToken({
      id: user.id,
      email: user.email,
    });
    await this.userService.update(user.id, {
      refresh_token,
    });
    return {
      access_token,
      refresh_token,
    };
  }

  async register(data: RegisterRequestDto): Promise<User> {
    const findUser = await this.userService.findOne({ email: data.email });
    if (findUser) {
      throw new ConflictException('Email already exist');
    }
    const salt = bcrypt.genSaltSync(10);
    const hashed_password = bcrypt.hashSync(data.password, salt);
    const roles = await this.roleService.getListRoleByIds([17]);
    const user = await this.userService.create({
      ...data,
      salt,
      password: hashed_password,
      roles: roles,
    });
    await this.mailService.handleSendEmail(user);
    return user;
  }

  async refreshAccessToken(user: User): Promise<ITokenResponse> {
    const access_token = this.generateAccessToken({
      id: user.id,
      email: user.email,
    });
    const refresh_token = this.generateRefreshToken({
      id: user.id,
      email: user.email,
    });
    await this.userService.update(user.id, {
      refresh_token,
    });
    return {
      access_token,
      refresh_token,
    };
  }

  generateAccessToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      algorithm: 'RS256',
      privateKey: access_token_private_key,
      expiresIn: `${this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
    });
  }

  generateRefreshToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      algorithm: 'RS256',
      privateKey: refresh_token_private_key,
      expiresIn: `${this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
    });
  }

  async getUserIfRefreshtokenMatched(
    id: number,
    refresh_token: string,
  ): Promise<User> {
    const findUser = await this.userService.findOne({ id: id });
    if (!findUser) {
      throw new UnauthorizedException();
    }
    if (refresh_token !== findUser.refresh_token) {
      throw new BadRequestException();
    }
    return findUser;
  }
}
