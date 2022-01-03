// db.ts
import Dexie, { Table } from 'dexie';

export interface Item {
  id?: number;
  name: string;
  age: number;
  image: string;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  items!: Table<Item>; 

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      items: '++id, name, age, image' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();

