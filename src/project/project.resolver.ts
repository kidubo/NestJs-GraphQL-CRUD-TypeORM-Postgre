import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/strategies/gql-auth-guard';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => Project, { name: 'createProject' })
  createProject(@Args('project') project: CreateProjectInput) {
    return this.projectService.create(project);
  }

  @Query(() => [Project], { name: 'getAllprojects' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.projectService.findAll();
  }

  @Query(() => Project, { name: 'project' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Mutation(() => Project)
  @UseGuards(GqlAuthGuard)
  updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectService.update(
      updateProjectInput.id,
      updateProjectInput,
    );
  }

  @Mutation(() => Project)
  @UseGuards(GqlAuthGuard)
  removeProject(@Args('id') id: string) {
    return this.projectService.remove(id);
  }
}
