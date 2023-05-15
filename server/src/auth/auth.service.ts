import { BadRequestException, ForbiddenException, HttpCode, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDto, LoginDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService, private jwt: JwtService) { }


  async signup(signUpDto: SignUpDto) {
    const hash = await argon.hash(signUpDto.password)

    try {
      const user = await this.prisma.user.create({
        data: {
          firstName: signUpDto.firstName,
          lastName: signUpDto.lastName,
          email: signUpDto.email,
          hash: hash
        },
        select: {
          firstName: true,
          lastName: true,
          email: true
        }
      })
      return { user, message: 'Signup sucessful' }
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException({ message: `${signUpDto.email} is already taken`, code: HttpCode(HttpStatus.BAD_REQUEST) })
      }
      else {
        throw new BadRequestException()
      }

    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email
      },
    })
    if (!user) throw new NotFoundException({ message: 'User does not exists' })

    const pwMatches = await argon.verify(user.hash, loginDto.password)

    if (!pwMatches) throw new ForbiddenException({ message: 'Invalid credentials' })

    return this.signToken(user.id, user.email, 'Login successful')
  }

  async signToken(userId: number, email: string, message: string): Promise<{ access_token: string, email: string, message: string }> {
    const payload = {
      sub: userId,
      email
    }

    const token = await this.jwt.signAsync(payload)
    return {
      access_token: token,
      email,
      message
    }
  }
}
