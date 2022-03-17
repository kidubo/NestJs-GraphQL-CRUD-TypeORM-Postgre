import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationError } from 'apollo-server-core';
import { Hash } from 'src/helpers/hash-helper';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entities';
import { LoginRequest } from './dto/login-request.dto';
import { AccessToken } from './interfaces/access-token.interface';
import { jwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private jwtService: JwtService,
  ) {}

  async login(loginRequest: LoginRequest): Promise<AccessToken> {
    const user = this.employeeRepository.findOne({
      username: loginRequest.username,
    });
    const { username, password } = loginRequest;

    if (!user) {
      throw new AuthenticationError('Invalid Credentials');
    }

    const verifyResult = await Hash.compare(password, (await user).password);

    if (!verifyResult) {
      throw new AuthenticationError('Invalid Credentials');
    }

    const payload: jwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
