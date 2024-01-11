import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  /**
   * This Property is used to describe the username
   * @type {string}
   */
  @Prop()
  username: string;

  /**
   * This Property is used to describe the email
   * @type {string}
   * @validate
   * @unique if not: "Email already exists"
   * @required
   */
  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: async function (email: string) {
        const user = await this.constructor.findOne({ email });
        return !user;
      },
      message: 'Email already exists',
    },
    type: String,
  })
  email: string;

  /**
   * This Property is used to describe the password
   * @type {string}
   */
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
