import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
export class Document extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  entityName: string;

  @Column()
  entityId: number;

  @Column()
  key: string;

  @Column()
  type: string;
}
