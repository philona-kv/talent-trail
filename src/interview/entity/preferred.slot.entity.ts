import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
class PreferredSlot extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  candidateId!: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  applicationId!: number;

  @Column()
  interviewId!: number;
}

export default PreferredSlot;
