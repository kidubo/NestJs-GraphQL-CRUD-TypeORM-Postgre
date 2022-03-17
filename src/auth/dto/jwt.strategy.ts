import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { jwtPayload } from '../interfaces/jwt-payload.interface';
import { Employee } from 'src/employee/entities/employee.entities';
import 'dotenv/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'process.env.',
    });
  }

  async validate(payload: jwtPayload): Promise<Employee> {
    const { username } = payload;
    const user = this.employeeRepository.findOne({ username: username });

    if (!user) {
      throw new UnauthorizedException('User is Unauthorized');
    }

    return user;
  }
}
