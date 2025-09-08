import { Schema,model,models} from 'mongoose'

const UserSchema = new Schema(
    {
        name:{
            type:String,
            required:[true,'Name is required']
        },
        email:{
            type:String,
            unique:[true,'Email already exits'],
            required:[true,'Email is required']
        },
        password:{
            type:String,
            required: function () {
            return this.provider === "credentials";
      },
        },
        image:{
            type:String
        },
        provider: {
        type: String,
        enum: ["credentials", "google"],
        default: "credentials",
        },
    },
    { timestamps: true }
);

const User = models.User || model('User',UserSchema);

export default User;