// users/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    name: string; // Novo campo para o nome do usuário
    
    _id: string; // Adiciona explicitamente a propriedade _id
}

export const UserSchema = SchemaFactory.createForClass(User);
