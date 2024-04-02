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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = require("node:fs/promises");
var glob_1 = require("glob");
function extractHeader(mdText) {
    var _a;
    var header = { tags: [] };
    var rawHeader = (_a = mdText.match(/^---\n(.*?)\n---\n/s)) === null || _a === void 0 ? void 0 : _a[1];
    if (!rawHeader)
        return header;
    rawHeader.split("\n").forEach(function (line) {
        var _a = line.split(": "), key = _a[0], value = _a[1];
        switch (key) {
            case "tags":
                // Note value is like: "[tag1, tag2, tag3]"
                var tags = value.substring(1, value.length - 1).split(", ");
                for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                    var tag = tags_1[_i];
                    tag = tag.replace(/"/g, "").trim();
                    if (!tag)
                        continue;
                    header.tags.push(tag);
                }
                break;
            default:
                break;
        }
    });
    return header;
}
var tag2file = new Map();
var file2tag = new Map();
function crawlTags() {
    return __awaiter(this, void 0, void 0, function () {
        var mdFiles, _loop_1, _i, mdFiles_1, file;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (tag2file.size > 0)
                        return [2 /*return*/, [tag2file, file2tag]];
                    mdFiles = glob_1.glob.sync("src/pages/atcoder/**/*.{md,mdx}");
                    _loop_1 = function (file) {
                        var mdText, header;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, (0, promises_1.readFile)(file, "utf-8")];
                                case 1:
                                    mdText = _b.sent();
                                    header = extractHeader(mdText);
                                    header.tags.forEach(function (tag) {
                                        tag2file.set(tag, (tag2file.get(tag) || []).concat(file));
                                        file2tag.set(file, (file2tag.get(file) || []).concat(tag));
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, mdFiles_1 = mdFiles;
                    _a.label = 1;
                case 1:
                    if (!(_i < mdFiles_1.length)) return [3 /*break*/, 4];
                    file = mdFiles_1[_i];
                    return [5 /*yield**/, _loop_1(file)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, [tag2file, file2tag]];
            }
        });
    });
}
exports.default = crawlTags;
