import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedTbRoles1633817215989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("INSERT INTO tb_roles(name, created_at) VALUES ('admin', now())");
    await queryRunner.query("INSERT INTO tb_roles(name, created_at) VALUES ('customer', now())");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM tb_roles WHERE name = 'admin'");
    await queryRunner.query("DELETE FROM tb_roles WHERE name = 'customer'");
  }
}
