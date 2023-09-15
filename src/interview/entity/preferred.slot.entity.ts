import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
class PreferredSlot extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  candidateId!: number;

  @Column({ nullable: true })
  startDate?: Date;

  @Column({ nullable: true })
  endDate?: Date;

  @Column()
  applicationId!: number;

  @Column()
  interviewId!: number;

  @Column()
  round!: number;
}

export default PreferredSlot;
