import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
class Job extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ type: 'jsonb', nullable: true })
  info: any;
}

export default Job;