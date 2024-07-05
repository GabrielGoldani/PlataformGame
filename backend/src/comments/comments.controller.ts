// comments/comments.controller.ts

import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.schema';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get(':pageId')
    async findAllByPage(@Param('pageId') pageId: string): Promise<Comment[]> {
        return this.commentsService.findAllByPage(pageId);
    }

    @Post()
    async create(@Body() commentData: Comment): Promise<Comment> {
        return this.commentsService.create(commentData);
    }

    @Delete(':pageId')
    async deleteByPage(@Param('pageId') pageId: string): Promise<{ message: string }> {
        try {
            await this.commentsService.deleteByPage(pageId);
            return { message: 'Comentários deletados com sucesso.' };
        } catch (error) {
            throw new Error(`Erro ao deletar comentários da página ${pageId}: ${error.message}`);
        }
    }
}
