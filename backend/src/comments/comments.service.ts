// comments/comments.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comment.schema';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
    ) {}

    async findAllByPage(pageId: string): Promise<Comment[]> {
        return this.commentModel.find({ pageId }).exec();
    }

    async create(commentData: Comment): Promise<Comment> {
        const createdComment = new this.commentModel(commentData);
        return createdComment.save();
    }
    
    async deleteByPage(pageId: string): Promise<void> {
        await this.commentModel.deleteMany({ pageId });
    }
}
