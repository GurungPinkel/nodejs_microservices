import mongoose, { Schema } from 'mongoose';
import { Password } from '../services/password';

// interface used for creating a new user
interface UserAttributes {
  email: string;
  password: string;
}

// interface to add create Method to UserModel
interface UserModel extends mongoose.Model<UserDoc> {
  build(attributes: UserAttributes): UserDoc;
}

// interface to describe what an existing user has
interface UserDoc extends mongoose.Document {
  email: string,
  password: string
}

const userSchema = new Schema ({
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    minlength: 4,
    required: true    
  }
},{
  toJSON:{
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
});

userSchema.pre('save', async function (done) {
  if(this.isModified('password')) {
    const hashed = await Password.hash(this.get('password'));
    this.set('password', hashed);
    done();
  }
});

userSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };