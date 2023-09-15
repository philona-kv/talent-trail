import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
class Interview extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  candidateId!: number;

  @Column({ nullable: true })
  employeeId?: number;

  @Column()
  applicationId!: number;

  @Column({ nullable: true })
  startDate?: Date;

  @Column({ nullable: true })
  endDate?: Date;

  @Column({ nullable: true, type: 'jsonb' })
  feedback?: any;

  @Column()
  round!: number;

  @Column()
  status!: string;

  @Column({ nullable: true })
  next?: number;

  @Column({ nullable: true })
  prev?: number;
}

export default Interview;
