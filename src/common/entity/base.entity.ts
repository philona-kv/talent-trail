import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

class BaseEntity {
  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ nullable: true })
  createdBy?: number;

  @Column({ nullable: true })
  updatedBy?: number;
}

export default BaseEntity;
