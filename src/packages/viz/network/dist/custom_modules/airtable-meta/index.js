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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirtableMeta = void 0;
const types_1 = require("./types");
const utils_1 = require("./utils");
class AirtableMeta {
    /**
     * Create new AirtableMeta connection with the defined API key.
     * @param props AirtableMeta properties in AirtableMetaProps
     */
    constructor(props) {
        this.apiKey = props.apiKey;
    }
    getBases() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getRawBaseList();
        });
    }
    getTablesOfBase(baseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getRawTableList(baseId);
        });
    }
    getRawBaseList() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getBasesUrl();
            const res = yield this.get(url);
            if (res.parsedBody === undefined)
                throw new Error("Request failed");
            else {
                return res.parsedBody.bases;
            }
        });
    }
    getRawTableList(baseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getTablesUrl(baseId);
            const res = yield this.get(url);
            if (res.parsedBody === undefined)
                throw new Error("Request failed");
            else {
                return res.parsedBody.tables;
            }
        });
    }
    getBasesUrl() {
        return types_1.AIRTABLE_META_API_ROOT + `/bases`;
    }
    getTablesUrl(baseId) {
        return types_1.AIRTABLE_META_API_ROOT + `/bases/${baseId}/tables`;
    }
    get(url, headers) {
        if (this.apiKey === undefined)
            throw new Error("API key required");
        return (0, utils_1.get)(url, Object.assign(Object.assign({}, headers), { Authorization: `Bearer ${this.apiKey}` }));
    }
}
exports.AirtableMeta = AirtableMeta;
exports.default = AirtableMeta;
//# sourceMappingURL=index.js.map