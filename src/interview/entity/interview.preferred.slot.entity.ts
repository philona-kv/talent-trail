import { Column, Entity, PrimaryColumn } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
class InterviewerVsPreferredSlot extends BaseEntity {
  @PrimaryColumn()
  slotId!: number;

  @PrimaryColumn()
  userId!: number;

  @Column()
  status!: string;

  @Column({ nullable: true })
  rejectionReason?: string;
}

export default InterviewerVsPreferredSlot;
