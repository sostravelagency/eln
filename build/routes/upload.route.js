"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.routes/upload.route.ts
const express_1 = __importDefault(require("express"));
const upload_controller_1 = require("../controllers/upload.controller");
const uploadRouter = express_1.default.Router();
uploadRouter.post('/upload', upload_controller_1.uploadVideoController);
exports.default = uploadRouter;
