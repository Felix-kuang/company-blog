import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('text', { nullable: false })
  slogan: string;

  @Column({ default: false })
  about: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;
}
