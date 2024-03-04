import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRole1709266677843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE role (
                id SERIAL PRIMARY KEY,
                name VARCHAR NOT NULL,
                code VARCHAR NOT NULL UNIQUE,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE role`);
  }
}
