import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Employee } from './entities/employee.entities';
import { EmployeeService } from './employee.service';
import { EmployeeCreateDTO } from './dto/create.employee.input';
import { Project } from '../project/entities/project.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/strategies/gql-auth-guard';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'getAllEmployees' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.employeeService.findAll();
  }

  @Query(() => Employee, { name: 'getEmployeeById' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Mutation(() => Employee, { name: 'signup' })
  create(@Args('employee') employee: EmployeeCreateDTO) {
    return this.employeeService.create(employee);
  }
  @ResolveField('project', () => Project)
  @UseGuards(GqlAuthGuard)
  project(@Parent() employee: Employee) {
    return this.employeeService.getProject(employee.projectId);
  }
}
