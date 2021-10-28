"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var just_template_1 = tslib_1.__importDefault(require("just-template"));
var TopicGenerator = (function () {
    function TopicGenerator() {
    }
    return TopicGenerator;
}());
exports.default = {
    api: {
        message: new ((function (_super) {
            tslib_1.__extends(class_1, _super);
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
            tslib_1.__extends(class_2, _super);
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
            tslib_1.__extends(class_3, _super);
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
            tslib_1.__extends(class_4, _super);
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
        feedsOrders: new ((function (_super) {
            tslib_1.__extends(class_5, _super);
            function class_5() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/feeds/*/orders';
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
        feedsMessages: new ((function (_super) {
            tslib_1.__extends(class_6, _super);
            function class_6() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/feeds/*/messages';
                return _this;
            }
            class_6.prototype.generateTopic = function () {
                return this.template;
            };
            class_6.prototype.isTopic = function (topic) {
                return topic === this.template;
            };
            return class_6;
        }(TopicGenerator)))(),
        feedMessages: new ((function (_super) {
            tslib_1.__extends(class_7, _super);
            function class_7() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/feeds/${id}/messages';
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
        feedMessagesStatus: new ((function (_super) {
            tslib_1.__extends(class_8, _super);
            function class_8() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/feeds/${id}/messages/*/status';
                return _this;
            }
            class_8.prototype.generateTopic = function (data) {
                return this.template.replace('${id}', data.id);
            };
            class_8.prototype.isTopic = function (topic, data) {
                return new RegExp(this.template.replace('${id}', data.id).replace('*', '\\*'), 'g').test(topic);
            };
            return class_8;
        }(TopicGenerator)))(),
        feedMessagesReactions: new ((function (_super) {
            tslib_1.__extends(class_9, _super);
            function class_9() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/feeds/${id}/messages/*/reactions';
                return _this;
            }
            class_9.prototype.generateTopic = function (data) {
                return this.template.replace('${id}', data.id);
            };
            class_9.prototype.isTopic = function (topic, data) {
                return new RegExp(this.template.replace('${id}', data.id).replace('*', '\\*'), 'g').test(topic);
            };
            return class_9;
        }(TopicGenerator)))(),
        feedEvents: new ((function (_super) {
            tslib_1.__extends(class_10, _super);
            function class_10() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/feeds/${id}/events';
                return _this;
            }
            class_10.prototype.generateTopic = function (data) {
                return this.template.replace('${id}', data.id);
            };
            class_10.prototype.isTopic = function (topic, data) {
                return new RegExp(this.template.replace('${id}', data.id), 'g').test(topic);
            };
            return class_10;
        }(TopicGenerator)))(),
        feedOrders: new ((function (_super) {
            tslib_1.__extends(class_11, _super);
            function class_11() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/feeds/${id}/orders';
                return _this;
            }
            class_11.prototype.generateTopic = function (data) {
                return this.template.replace('${id}', data.id);
            };
            class_11.prototype.isTopic = function (topic, data) {
                return new RegExp(this.template.replace('${id}', data.id), 'g').test(topic);
            };
            return class_11;
        }(TopicGenerator)))(),
        feedTyping: new ((function (_super) {
            tslib_1.__extends(class_12, _super);
            function class_12() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/feeds/${id}/typing';
                return _this;
            }
            class_12.prototype.generateTopic = function (data) {
                return this.template.replace('${id}', data.id);
            };
            class_12.prototype.isTopic = function (topic, data) {
                return new RegExp(this.template.replace('${id}', data.id), 'g').test(topic);
            };
            return class_12;
        }(TopicGenerator)))(),
        feedPresence: new ((function (_super) {
            tslib_1.__extends(class_13, _super);
            function class_13() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/feeds/${id}/presence';
                return _this;
            }
            class_13.prototype.generateTopic = function (data) {
                return this.template.replace('${id}', data.id);
            };
            class_13.prototype.isTopic = function (topic, data) {
                return new RegExp(this.template.replace('${id}', data.id), 'g').test(topic);
            };
            return class_13;
        }(TopicGenerator)))(),
        clients: {
            arm: new ((function (_super) {
                tslib_1.__extends(class_14, _super);
                function class_14() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.template = 'api/clients/${clientId}/arm';
                    return _this;
                }
                class_14.prototype.generateTopic = function (data) {
                    return just_template_1.default(this.template, data);
                };
                class_14.prototype.isTopic = function (topic) {
                    return new RegExp(this.template.replace('${clientId}', '\\w+'), 'g').test(topic);
                };
                return class_14;
            }(TopicGenerator)))()
        },
        people: new ((function (_super) {
            tslib_1.__extends(class_15, _super);
            function class_15() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/people';
                return _this;
            }
            class_15.prototype.generateTopic = function () {
                return this.template;
            };
            class_15.prototype.isTopic = function (topic) {
                return topic === this.template;
            };
            return class_15;
        }(TopicGenerator)))(),
        personChange: new ((function (_super) {
            tslib_1.__extends(class_16, _super);
            function class_16() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.template = 'api/people/${id}';
                return _this;
            }
            class_16.prototype.generateTopic = function (data) {
                return this.template.replace('${id}', data.id);
            };
            class_16.prototype.isTopic = function (topic, data) {
                return new RegExp(this.template.replace('${id}', data.id), 'g').test(topic);
            };
            return class_16;
        }(TopicGenerator)))()
    }
};
//# sourceMappingURL=topics.js.map