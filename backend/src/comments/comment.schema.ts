// comments/comment.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop({ required: true })
    user: string;

    @Prop({ required: true })
    text: string;

    @Prop({ required: true })
    pageId: string; // Adiciona um campo para identificar a página associada ao comentário
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
