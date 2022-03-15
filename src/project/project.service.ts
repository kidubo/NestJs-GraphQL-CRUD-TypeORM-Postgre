import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  create(project: CreateProjectInput) {
    const newProject = this.projectRepository.create(project);
    return this.projectRepository.save(newProject);
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['employee'],
    });
  }

  findOne(id: string) {
    return this.projectRepository.findOne(id, {
      relations: ['employee'],
    });
  }

  update(id: string, updateProjectInput: UpdateProjectInput) {
    const project: Project = this.projectRepository.create(updateProjectInput);
    project.id = id;
    return this.projectRepository.save(project);
  }

  async remove(id: string) {
    const proj = this.findOne(id);
    if (proj) {
      const ret = await this.projectRepository.delete(id);
      if (ret.affected === 1) {
        return proj;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  }
}
