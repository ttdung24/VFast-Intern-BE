import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProduct1709178195179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE product (
            id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL UNIQUE,
            description VARCHAR NOT NULL,
            price REAL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE product`);
  }
}
