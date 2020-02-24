"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var just_template_1 = __importDefault(require("just-template"));
var TopicGenerator = /** @class */ (function () {
    function TopicGenerator() {
    }
    return TopicGenerator;
}());
exports.default = {
    api: {
        message: new (/** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/message';
                return _this;
            }
            class_1.prototype.generateTopic = function () {
                return this.template;
            };
            class_1.prototype.isTopic = function (topic) {
                return topic === this.template;
            };
            return class_1;
        }(TopicGenerator)))(),
        clients: {
            arm: new (/** @class */ (function (_super) {
                __extends(class_2, _super);
                function class_2() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.template = 'api/clients/${clientId}/arm';
                    return _this;
                }
                class_2.prototype.generateTopic = function (data) {
                    return just_template_1.default(this.template, data);
                };
                class_2.prototype.isTopic = function (topic) {
                    // TODO: this expression
                    return new RegExp(this.template.replace('${clientId}', '\\w+'), 'g').test(topic);
                };
                return class_2;
            }(TopicGenerator)))()
        }
    }
};
// export function availableTopics(): Map<string, TopicGenerator> {
// }
//# sourceMappingURL=topics.js.map