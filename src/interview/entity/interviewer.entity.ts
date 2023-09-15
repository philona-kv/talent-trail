import { Entity, PrimaryColumn } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
class Interviewer extends BaseEntity {
  @PrimaryColumn()
  categoryId!: number;

  @PrimaryColumn()
  employeeId!: number;
}

export default Interviewer;
