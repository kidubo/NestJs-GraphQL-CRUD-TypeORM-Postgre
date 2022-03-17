import { Field, ObjectType } from '@nestjs/graphql';
import { Hash } from 'src/helpers/hash-helper';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';

@ObjectType()
@Entity('Employee')
export class Employee {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  designation: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string;

  @Field()
  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Project, (project) => project.employee)
  @Field(() => Project)
  project: Project;

  @Field()
  @Column()
  projectId: string;

  @BeforeInsert()
  async beforeInsert() {
    this.password = await Hash.make(this.password);
  }
}
