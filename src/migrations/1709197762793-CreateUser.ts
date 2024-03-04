import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1709197762793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "user" (
            id SERIAL PRIMARY KEY,
            email VARCHAR NOT NULL UNIQUE,
            password VARCHAR NOT NULL,
            name VARCHAR NULL,
            address VARCHAR NULL,
            phone VARCHAR NULL,
            age INTEGER NULL,
            salt VARCHAR NOT NULL,
            refresh_token VARCHAR NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
