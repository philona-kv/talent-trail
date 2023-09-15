import { MigrationInterface, QueryRunner } from 'typeorm';

export class employeeSkills1694802342796 implements MigrationInterface {
  name = 'employeeSkills1694802342796';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee" ADD "skills" text array`);
    await queryRunner.query(
      `ALTER TABLE "employee" ADD "experience" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
    await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "skills"`);
  }
}
