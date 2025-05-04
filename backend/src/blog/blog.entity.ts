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

  @Column('varchar', { length: 255, nullable: false })
  title: string;

  @Column('text', { nullable: false })
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishedAt: Date;
}
