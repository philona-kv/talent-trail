import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
class Application extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  candidateId: number;

  @Column()
  jobId: number;

  @Column({ nullable: true })
  referredBy?: number;

  @Column()
  status: string;

  @Column()
  appliedDate: Date;

  @Column({ type: 'jsonb', nullable: true })
  timeline?: any;

  @Column({ nullable: true })
  score?: number;
}

export default Application;
