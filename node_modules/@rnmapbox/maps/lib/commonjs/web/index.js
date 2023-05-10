"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Camera", {
  enumerable: true,
  get: function () {
    return _Camera.default;
  }
});
Object.defineProperty(exports, "Logger", {
  enumerable: true,
  get: function () {
    return _Logger.default;
  }
});
Object.defineProperty(exports, "MapView", {
  enumerable: true,
  get: function () {
    return _MapView.default;
  }
});
exports.default = void 0;
var _MapboxModule = _interopRequireDefault(require("./MapboxModule"));
var _Camera = _interopRequireDefault(require("./components/Camera"));
var _MapView = _interopRequireDefault(require("./components/MapView"));
var _Logger = _interopRequireDefault(require("./utils/Logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ExportedComponents = {
  Camera: _Camera.default,
  MapView: _MapView.default,
  Logger: _Logger.default
};
const Mapbox = {
  ..._MapboxModule.default,
  ...ExportedComponents
};
var _default = Mapbox;
exports.default = _default;
//# sourceMappingURL=index.js.map