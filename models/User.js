const { DataTypes } = require('sequelize');
const BaseModel = require('../bases/BaseModel');
const bcrypt = require('bcryptjs'); // You must install this

module.exports = (sequelize) => {
  class User extends BaseModel {
    async comparePassword(plainPassword) {
      return await bcrypt.compare(plainPassword, this.password);
    }
       async sendOtp() {
      // Generate 4-digit OTP
      const otp = Math.floor(1000 + Math.random() * 9000);

      // Save OTP to the user instance
      this.otp = otp;
      await this.save();
      // (Optional) Log or send OTP
      console.log(`OTP sent to ${this.email}: ${otp}`);
      // You can integrate email/SMS here to send the OTP.
      return otp;
    }

  // In your User model
async isVerifyOtp(otp) {
  // 1. Input validation
  if (!otp || !this.otp) {
    return false;
  }

  // 2. Convert both OTPs to string for consistent comparison
  const storedOtp = String(this.otp);
  const receivedOtp = String(otp);

  // 3. Basic comparison (keeping your current logic)
  if (storedOtp !== receivedOtp) {
    return false;
  }

  // 4. Update user state
  this.otp = null; // Use null instead of empty string
  this.isVerify = true;

  // 5. Save only the changed fields
  await this.save({
    fields: ['otp', 'isVerify'],
    validate: false // Skip validation if you're only updating these fields
  });

  return true;
}

  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isVerify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    // paranoid: true, // enables soft deletes (adds `deletedAt`)
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  return User;
};
