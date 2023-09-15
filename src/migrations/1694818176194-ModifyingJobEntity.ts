import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyingJobEntity1694818176194 implements MigrationInterface {
  name = 'ModifyingJobEntity1694818176194';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job" ADD "status" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "status"`);
  }
}
