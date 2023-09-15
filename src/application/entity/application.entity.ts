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

  @Column({ nullable: false })
  referredBy?: number;

  @Column()
  status: string;

  @Column()
  appliedDate: Date;
}

export default Application;
