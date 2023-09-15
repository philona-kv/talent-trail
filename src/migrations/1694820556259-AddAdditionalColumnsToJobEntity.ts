import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdditionalColumnsToJobEntity1694820556259
  implements MigrationInterface
{
  name = 'AddAdditionalColumnsToJobEntity1694820556259';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job" ADD "overview" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD "jobType" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "jobType"`);
    await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "overview"`);
  }
}
