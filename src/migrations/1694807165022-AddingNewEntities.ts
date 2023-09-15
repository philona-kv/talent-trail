import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingNewEntities1694807165022 implements MigrationInterface {
  name = 'AddingNewEntities1694807165022';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "application" ADD "timeline" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "preferred_slot" ADD "round" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "preferred_slot" DROP COLUMN "round"`);
    await queryRunner.query(`ALTER TABLE "application" DROP COLUMN "timeline"`);
  }
}
