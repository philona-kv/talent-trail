import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLocationToJob1694760618678 implements MigrationInterface {
  name = 'AddLocationToJob1694760618678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job" ADD "location" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "location"`);
  }
}
