import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyingPreferredSlotEntity1694810797517
  implements MigrationInterface
{
  name = 'ModifyingPreferredSlotEntity1694810797517';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "preferred_slot" ALTER COLUMN "startDate" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "preferred_slot" ALTER COLUMN "endDate" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "preferred_slot" ALTER COLUMN "endDate" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "preferred_slot" ALTER COLUMN "startDate" SET NOT NULL`,
    );
  }
}
