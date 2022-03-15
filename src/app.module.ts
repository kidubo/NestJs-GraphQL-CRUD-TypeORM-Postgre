import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/entities/employee.entities';
import { Project } from './project/entities/project.entity';
import { ProjectModule } from './project/project.module';
import config from './env/config';

console.log(process.env.DB_PASSWORD);

@Module({
  imports: [
    EmployeeModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: config.type,
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      synchronize: true,
      // logging: false,
      entities: [Employee, Project],
      // migrations: ['src/migration/**/*.ts'],
      // subscribers: ['src/subscriber/**/*.ts'],
    }),
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
