import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  email!: string;

  @Column()
  name!: string;

  @Column('varchar', { array: true })
  role: string[];

  @Column()
  password!: string;
}

export default Employee;
