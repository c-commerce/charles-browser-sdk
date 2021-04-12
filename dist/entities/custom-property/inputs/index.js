"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMERANGE = exports.TIME = exports.TEXTINPUT = exports.SELECT = exports.RADIO = exports.PHONENUMBER = exports.NUMBERWITHUNITINPUT = exports.NUMBERINPUT = exports.MULTISELECT = exports.LARGETEXTINPUT = exports.DATETIMERANGE = exports.DATETIME = exports.DATERANGE = exports.DATE = exports.CURRENCYINPUT = exports.CHECKBOX = void 0;
var date_fns_1 = require("date-fns");
exports.CHECKBOX = {
    serialize: function (input) {
        if (typeof input === 'boolean') {
            return input;
        }
        if (input === null || input === undefined) {
            return null;
        }
        throw new Error('Checkbox input must be boolean or null');
    }
};
exports.CURRENCYINPUT = {
    serialize: function (input) {
        if ((input === null || input === void 0 ? void 0 : input.amount) && (input === null || input === void 0 ? void 0 : input.currency)) {
            return input;
        }
        return null;
    }
};
exports.DATE = {
    serialize: function (input) {
        if (!input) {
            return null;
        }
        return date_fns_1.formatISO(input, { representation: 'date' });
    }
};
exports.DATERANGE = {
    serialize: function (input) {
        if (!input) {
            return null;
        }
        var start = (input === null || input === void 0 ? void 0 : input.start) ? date_fns_1.formatISO(input.start, { representation: 'date' }) : null;
        var end = (input === null || input === void 0 ? void 0 : input.end) ? date_fns_1.formatISO(input.end, { representation: 'date' }) : null;
        if (start === 'Invalid Date' || end === 'invalid Date') {
            throw new Error('DATERANGE start & end values must be valid dates');
        }
        return {
            start: start,
            end: end
        };
    }
};
exports.DATETIME = {
    serialize: function (input) {
        if (!input) {
            return null;
        }
        return date_fns_1.formatISO(input);
    }
};
exports.DATETIMERANGE = {
    serialize: function (input) {
        if (!input) {
            return null;
        }
        var start = (input === null || input === void 0 ? void 0 : input.start) ? date_fns_1.formatISO(input.start) : null;
        var end = (input === null || input === void 0 ? void 0 : input.end) ? date_fns_1.formatISO(input.end) : null;
        if (start === 'Invalid Date' || end === 'invalid Date') {
            throw new Error('DATETIMERANGE start & end values must be valid dates');
        }
        return {
            start: start,
            end: end
        };
    }
};
exports.LARGETEXTINPUT = {
    serialize: function (input) {
        return input !== null && input !== void 0 ? input : null;
    }
};
exports.MULTISELECT = {
    serialize: function (inputs) {
        if (!inputs) {
            return null;
        }
        return inputs;
    }
};
exports.NUMBERINPUT = {
    serialize: function (input) {
        return input !== null && input !== void 0 ? input : null;
    }
};
exports.NUMBERWITHUNITINPUT = {
    serialize: function (input) {
        if (!input) {
            return null;
        }
        return input;
    }
};
exports.PHONENUMBER = {
    serialize: function (input) {
        return input !== null && input !== void 0 ? input : null;
    }
};
exports.RADIO = {
    serialize: function (input) {
        return input !== null && input !== void 0 ? input : null;
    }
};
exports.SELECT = {
    serialize: function (input) {
        return input !== null && input !== void 0 ? input : null;
    }
};
exports.TEXTINPUT = {
    serialize: function (input) {
        return input !== null && input !== void 0 ? input : null;
    }
};
exports.TIME = {
    serialize: function (input) {
        if (!input) {
            return null;
        }
        return date_fns_1.formatISO(input, { representation: 'time' });
    }
};
exports.TIMERANGE = {
    serialize: function (input) {
        if (!input) {
            return null;
        }
        var start = (input === null || input === void 0 ? void 0 : input.start) ? date_fns_1.formatISO(input.start, { representation: 'time' }) : null;
        var end = (input === null || input === void 0 ? void 0 : input.end) ? date_fns_1.formatISO(input.end, { representation: 'time' }) : null;
        if (start === 'Invalid Date' || end === 'invalid Date') {
            throw new Error('DATERANGE start & end values must be valid dates');
        }
        return {
            start: start,
            end: end
        };
    }
};
//# sourceMappingURL=index.js.map