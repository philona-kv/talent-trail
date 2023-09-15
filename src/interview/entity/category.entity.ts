import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
class Category extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  name!: string;
}

export default Category;
