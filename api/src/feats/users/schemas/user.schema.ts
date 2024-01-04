import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class User {
    @Prop()
    username: string;

    @Prop({ 
        required: true, 
        unique: true, 
        validate: {
            validator: async function(email: string) {
                const user = await this.constructor.findOne({ email });
                return !user;
            },
            message: 'Email already exists'
        },
        type: String 
    })
    email: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);