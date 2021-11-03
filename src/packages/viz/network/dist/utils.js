"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortObjectsBy = exports.capitalize = void 0;
/**
 * Returns a copy of the provided string capitalized.
 * @param s The string
 * @returns The string with first char. uppercase
 */
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.substring(1);
}
exports.capitalize = capitalize;
/**
 * Returns function to sort objects by the defined field
 * @param field The field
 * @returns The objects sorted by the field
 */
const sortObjectsBy = (field) => {
    return (a, b) => {
        if (a[field] > b[field]) {
            return 1;
        }
        else if (a[field] < b[field])
            return -1;
        else
            return 0;
    };
};
exports.sortObjectsBy = sortObjectsBy;
//# sourceMappingURL=utils.js.map