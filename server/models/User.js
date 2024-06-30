const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const UserSchema = new mongoose.Schema({
    username:{ 
        type: String, 
        required: true, 
        unique: true 
    },
    password:{ 
        type: String, 
        required: true,
    },
    name:{ 
        type:String, 
        required:true 
    },
    dueDate:{type:Date},
    createdAt:{ 
        type: Date, 
        default: Date.now,
    }
})

UserSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})
  
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)