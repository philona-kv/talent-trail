import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';
import { JobInfo } from '../types/job.info.types';

@Entity()
class Job extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  overview?: string;

  @Column()
  description!: string;

  @Column({ type: 'jsonb', nullable: true })
  location: {
    state?: string;
    country?: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  info: JobInfo;

  @Column()
  categoryId: number;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  jobType?: string;
}

export default Job;
