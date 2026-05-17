import { ParseValue } from '.';
import { bytes } from './bytes';

export default function sampleData(date: Date = new Date()): ParseValue {
  return {
    file: {
      createdAt: date,
      updatedAt: date,
      deletesAt: date,
      favorite: true,
      id: 'cm1dvtfpy000008kv7f4dea03',
      originalName: 'fileOriginalName.png',
      name: '51QcNn.png',
      size: bytes('5mb'),
      type: 'image/png',
      views: 12345,
      maxViews: 1000000,
      folderId: 'cm1dvw7xo000208kv7bhiebxl',
    },

    url: {
      createdAt: date,
      updatedAt: date,
      id: 'cm1dvwl5n000308kv49475k66',
      code: '5XbW8b',
      vanity: 'google',
      destination: 'https://google.com',
      views: 12345,
      maxViews: 1000000,
    },

    user: {
      id: 'cm1dvxhfq000408kvf42r6dgb',
      createdAt: date,
      updatedAt: date,
      role: 'USER',
      username: 'a username',
    },

    link: {
      raw: 'https://example.com/r/51QcNn.png',
      returned: 'https://example.com/u/51QcNn.png',
    },

    metricsUser: {
      files: 100,
      urls: 23,
      storage: bytes('1gb'),
      fileViews: 12345,
      urlViews: 12345,
    },

    metricsZipline: {
      files: 200,
      urls: 30,
      storage: bytes('2gb'),
      fileViews: 12345 * 3,
      urlViews: 12345 * 2,
    },
  };
}
