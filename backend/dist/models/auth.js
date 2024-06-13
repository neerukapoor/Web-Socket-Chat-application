"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, 'Please provide a valid email']
    },
    username: {
        type: String,
        unique: true,
        required: [true, "username field is require"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
    },
    gender: {
        type: String,
        required: [true, "Please provide your gender"]
    },
    profilePic: {
        type: String
    }
}, { timestamps: true });
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, 12);
        next();
    });
});
userSchema.method('correctPassword', function correctPassword(candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(candidatePassword, userPassword);
    });
});
exports.User = mongoose_1.default.model("User", userSchema);
