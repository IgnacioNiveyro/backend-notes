import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { Note, Tag } from '@prisma/client';

@Injectable()
export class NoteRepository {
  constructor(private prisma: PrismaService) {}

  async createNote(title: string, tags: string[]): Promise<any> {
    return this.prisma.note.create({
      data: {
        title,
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: { tags: true },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.note.findMany({ include: { tags: true } });
  }

  async findByTag(tag: string): Promise<any[]> {
    return this.prisma.note.findMany({
      where: {
        tags: {
          some: { name: tag },
        },
      },
      include: { tags: true },
    });
  }
  
  async updateNote(id: number, title: string, tags: string[]): Promise<any> {
    await this.prisma.note.update({
      where: { id },
      data: {
        tags: {
          set: [],
        },
      },
    });

    return this.prisma.note.update({
      where: { id },
      data: {
        title,
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: { tags: true },
    });
  }
  
  async deleteNote(id: number): Promise<void> {
    await this.prisma.note.delete({ where: { id } });
  }

  async archiveNote(id: number, active: boolean): Promise<any> {
    // Método simplificado que solo actualiza el estado 'active' sin tocar los tags
    return this.prisma.note.update({
      where: { id },
      data: { active },
      include: { tags: true },
    });
  }
  
  async findByStatus(active: boolean): Promise<any[]> {
    return this.prisma.note.findMany({
      where: { active },
      include: { tags: true },
    });
  }
}