import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyingApplicationEntity1694809715098
  implements MigrationInterface
{
  name = 'ModifyingApplicationEntity1694809715098';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "application" ALTER COLUMN "referredBy" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "application" ALTER COLUMN "referredBy" SET NOT NULL`,
    );
  }
}
