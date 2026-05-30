import * as migration_20260502_154117___name from './20260502_154117___name';
import * as migration_20260527_153859_add_articles_and_image_admin_labels from './20260527_153859_add_articles_and_image_admin_labels';

export const migrations = [
  {
    up: migration_20260502_154117___name.up,
    down: migration_20260502_154117___name.down,
    name: '20260502_154117___name',
  },
  {
    up: migration_20260527_153859_add_articles_and_image_admin_labels.up,
    down: migration_20260527_153859_add_articles_and_image_admin_labels.down,
    name: '20260527_153859_add_articles_and_image_admin_labels'
  },
];
