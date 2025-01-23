import { v4 as uuidv4 } from 'uuid';

export function generateId() {
  const numberPattern = /\d+/g;
  const uuid = uuidv4();
  return uuid.match(numberPattern)?.join('')!;
}
