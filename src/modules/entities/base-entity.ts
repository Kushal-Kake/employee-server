import * as TypeORM from 'typeorm';

export abstract class BaseEntity {
  @TypeORM.PrimaryGeneratedColumn('uuid')
  id!: string;
}
