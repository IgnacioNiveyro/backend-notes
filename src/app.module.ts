import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [PrismaModule, NoteModule],
})
export class AppModule {}
