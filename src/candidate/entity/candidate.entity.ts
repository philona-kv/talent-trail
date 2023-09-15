import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
class Candidate extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  password!: string;

  @Column()
  age!: number;

  @Column({ type: 'jsonb', nullable: true })
  info: any;

  @Column({ type: 'jsonb', nullable: true })
  onboardingInfo: any;
}

export default Candidate;
