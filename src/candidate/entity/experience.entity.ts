// experience.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
export class Experience extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  candidateId: number;

  @Column()
  company: string;

  @Column()
  position: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;
}
