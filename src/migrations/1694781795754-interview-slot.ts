import { MigrationInterface, QueryRunner } from 'typeorm';

export class interviewSlot1694781795754 implements MigrationInterface {
  name = 'interviewSlot1694781795754';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "interviewer_vs_preferred_slot" ALTER COLUMN "rejectionReason" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "interviewer_vs_preferred_slot" ALTER COLUMN "rejectionReason" SET NOT NULL`,
    );
  }
}
