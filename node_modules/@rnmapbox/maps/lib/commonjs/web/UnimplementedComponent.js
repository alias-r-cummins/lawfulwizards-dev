"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UnimplementedComponent = name => class SymbolLater extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, "TODO implement ", name);
  }
};
var _default = UnimplementedComponent;
exports.default = _default;
//# sourceMappingURL=UnimplementedComponent.js.map