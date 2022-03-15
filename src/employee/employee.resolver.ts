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

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'getAllEmployees' })
  findAll() {
    return this.employeeService.findAll();
  }

  @Query(() => Employee, { name: 'getEmployeeById' })
  findOne(@Args('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  create(@Args('employee') employee: EmployeeCreateDTO) {
    return this.employeeService.create(employee);
  }
  @ResolveField('project', () => Project)
  project(@Parent() employee: Employee) {
    return this.employeeService.getProject(employee.projectId);
  }
}
