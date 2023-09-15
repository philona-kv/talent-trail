import { readFile } from 'fs';
import { promisify } from 'util';

export class FileUtils {
  static async readFile(filepath: string): Promise<string> {
    try {
      const readFilePromise = promisify(readFile);
      return await readFilePromise(filepath, 'utf8');
    } catch (err) {
      return Promise.reject('Could not read file');
    }
  }
}
