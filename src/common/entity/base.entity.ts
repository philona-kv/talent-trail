import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

class BaseEntity {
  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ nullable: true })
  createdBy?: string;

  @Column({ nullable: true })
  updatedBy?: string;
}

export default BaseEntity;
