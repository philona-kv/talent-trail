import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyingInterviewEntity1694810601672
  implements MigrationInterface
{
  name = 'ModifyingInterviewEntity1694810601672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "interview" ALTER COLUMN "employeeId" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "interview" ALTER COLUMN "employeeId" SET NOT NULL`,
    );
  }
}
