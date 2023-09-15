import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeEntityIdTypeInDocumentEntity1694769489873
  implements MigrationInterface
{
  name = 'ChangeEntityIdTypeInDocumentEntity1694769489873';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "entityId"`);
    await queryRunner.query(
      `ALTER TABLE "document" ADD "entityId" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "entityId"`);
    await queryRunner.query(
      `ALTER TABLE "document" ADD "entityId" uuid NOT NULL`,
    );
  }
}
