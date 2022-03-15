import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeCreateDTO } from './dto/create.employee.input';
import { Employee } from './entities/employee.entities';
import { ProjectResolver } from '../project/project.resolver';
import { Project } from '../project/entities/project.entity';
import { ProjectService } from '../project/project.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private projectService: ProjectService,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: string) {
    return this.employeeRepository.findOne(id);
  }

  async create(employee: EmployeeCreateDTO): Promise<Employee> {
    const newEmployee = this.employeeRepository.create(employee);
    return this.employeeRepository.save(newEmployee);
  }

  async getProject(id: string): Promise<Project> {
    return this.projectService.findOne(id);
  }
}
