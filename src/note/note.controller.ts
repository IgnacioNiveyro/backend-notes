import { Controller, Get, Post, Put, Query, Body, Delete, Param } from '@nestjs/common';
import { NoteService } from './note.service';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() body: { title: string; tags: string[] }) {
    return this.noteService.create(body.title, body.tags);
  }

  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Get('by-tag')
  findByTag(@Query('tag') tag: string) {
    return this.noteService.findByTag(tag);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title: string; tags: string[] }
  ) {
    return this.noteService.updateNote(Number(id), body.title, body.tags);
  }
  @Delete(':id')
    remove(@Param('id') id: string) {
    return this.noteService.deleteNote(Number(id));
  }
  @Put(':id/archive')
archive(@Param('id') id: string, @Body() body: { active: boolean }) {
  return this.noteService.archiveNote(Number(id), body.active);
}
@Get('active')
getActiveNotes() {
  return this.noteService.findByStatus(true);
}
@Get('archived')
getArchivedNotes() {
  return this.noteService.findByStatus(false);
}
}
