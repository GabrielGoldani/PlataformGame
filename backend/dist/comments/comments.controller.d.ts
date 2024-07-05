import { CommentsService } from './comments.service';
import { Comment } from './comment.schema';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    findAllByPage(pageId: string): Promise<Comment[]>;
    create(commentData: Comment): Promise<Comment>;
    deleteByPage(pageId: string): Promise<{
        message: string;
    }>;
}
