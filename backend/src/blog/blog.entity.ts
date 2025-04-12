import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import { slugify } from 'src/utils/slugify';
import { Users } from 'src/users/users.entity';

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

  @ManyToOne(() => Users, (user) => user.blogs)
  author: Users;

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.title);
  }
}
