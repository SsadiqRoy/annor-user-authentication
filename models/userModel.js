const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: {
      type: String,
      unique: [true, 'This email already have an account'],
      required: [true, 'Please include your email'],
    },
    username: { type: String, unique: [true, 'Username is taken'], required: [true, 'Please include your username'] },
    studentId: {
      type: String,
      unique: [true, 'This student Id already have an account'],
      required: [true, 'Please include your student Id'],
      minLength: 8,
      maxLength: 8,
    },
    password: { type: String, required: [true, 'Password is required'], select: false, minLength: 8 },

    createdAt: Date,
  },
  {
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true, versionKey: false },
  }
);

userSchema.pre('save', async function () {
  const password = await bcrypt.hash(this.password, 13);
  this.password = password;

  if (this.isNew) this.createdAt = new Date();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
