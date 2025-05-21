import { Injectable } from '@nestjs/common';
import { NoteRepository } from './note.repository';

@Injectable()
export class NoteService {
  constructor(private noteRepo: NoteRepository) {}

  create(title: string, tags: string[]) {
    return this.noteRepo.createNote(title, tags);
  }

  async findAll() {
    return this.noteRepo.findAll();
  }

  findByTag(tag: string) {
    return this.noteRepo.findByTag(tag);
  }
  updateNote(id: number, title: string, tags: string[]) {
    return this.noteRepo.updateNote(id, title, tags);
  }
  deleteNote(id: number) {
    return this.noteRepo.deleteNote(id);
  }
  archiveNote(id: number, active: boolean) {
    return this.noteRepo.archiveNote(id, active);
  }
  findByStatus(active: boolean) {
    return this.noteRepo.findByStatus(active);
  }

}
