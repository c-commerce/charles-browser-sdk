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
var TopicGenerator = (function () {
    function TopicGenerator() {
    }
    return TopicGenerator;
}());
exports.default = {
    api: {
        message: new ((function (_super) {
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
        feeds: new ((function (_super) {
            __extends(class_2, _super);
            function class_2() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/feeds';
                return _this;
            }
            class_2.prototype.generateTopic = function () {
                return this.template;
            };
            class_2.prototype.isTopic = function (topic) {
                return topic === this.template;
            };
            return class_2;
        }(TopicGenerator)))(),
        feedsActivities: new ((function (_super) {
            __extends(class_3, _super);
            function class_3() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/feeds/*/activities';
                return _this;
            }
            class_3.prototype.generateTopic = function () {
                return this.template;
            };
            class_3.prototype.isTopic = function (topic) {
                return topic === this.template;
            };
            return class_3;
        }(TopicGenerator)))(),
        feedsEvents: new ((function (_super) {
            __extends(class_4, _super);
            function class_4() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/feeds/*/events';
                return _this;
            }
            class_4.prototype.generateTopic = function () {
                return this.template;
            };
            class_4.prototype.isTopic = function (topic) {
                return topic === this.template;
            };
            return class_4;
        }(TopicGenerator)))(),
        feedsMessages: new ((function (_super) {
            __extends(class_5, _super);
            function class_5() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/feeds/*/messages';
                return _this;
            }
            class_5.prototype.generateTopic = function () {
                return this.template;
            };
            class_5.prototype.isTopic = function (topic) {
                return topic === this.template;
            };
            return class_5;
        }(TopicGenerator)))(),
        feedMessages: new ((function (_super) {
            __extends(class_6, _super);
            function class_6() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/feeds/${id}/messages';
                return _this;
            }
            class_6.prototype.generateTopic = function (data) {
                return this.template.replace('${id}', data.id);
            };
            class_6.prototype.isTopic = function (topic, data) {
                return new RegExp(this.template.replace('${id}', data.id), 'g').test(topic);
            };
            return class_6;
        }(TopicGenerator)))(),
        feedEvents: new ((function (_super) {
            __extends(class_7, _super);
            function class_7() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/feeds/${id}/events';
                return _this;
            }
            class_7.prototype.generateTopic = function (data) {
                return this.template.replace('${id}', data.id);
            };
            class_7.prototype.isTopic = function (topic, data) {
                return new RegExp(this.template.replace('${id}', data.id), 'g').test(topic);
            };
            return class_7;
        }(TopicGenerator)))(),
        clients: {
            arm: new ((function (_super) {
                __extends(class_8, _super);
                function class_8() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.template = 'api/clients/${clientId}/arm';
                    return _this;
                }
                class_8.prototype.generateTopic = function (data) {
                    return just_template_1.default(this.template, data);
                };
                class_8.prototype.isTopic = function (topic) {
                    return new RegExp(this.template.replace('${clientId}', '\\w+'), 'g').test(topic);
                };
                return class_8;
            }(TopicGenerator)))()
        }
    }
};
//# sourceMappingURL=topics.js.map