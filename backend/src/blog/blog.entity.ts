import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { slugify } from 'src/utils/slugify';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ unique: true })
  slug: string;

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.title);
  }
}
