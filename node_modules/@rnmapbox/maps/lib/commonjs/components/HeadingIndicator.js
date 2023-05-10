"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _heading = _interopRequireDefault(require("../assets/heading.png"));
var _SymbolLayer = require("./SymbolLayer");
var _Images = _interopRequireDefault(require("./Images"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const style = {
  iconImage: 'userLocationHeading',
  iconAllowOverlap: true,
  iconPitchAlignment: 'map',
  iconRotationAlignment: 'map'
};
const HeadingIndicator = _ref => {
  let {
    heading
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
    key: "mapboxUserLocationHeadingIndicatorWrapper"
  }, /*#__PURE__*/_react.default.createElement(_Images.default, {
    images: {
      userLocationHeading: _heading.default
    },
    key: "mapboxUserLocationHeadingImages"
  }), /*#__PURE__*/_react.default.createElement(_SymbolLayer.SymbolLayer, {
    key: "mapboxUserLocationHeadingIndicator",
    id: "mapboxUserLocationHeadingIndicator",
    sourceID: "mapboxUserLocation",
    belowLayerID: "mapboxUserLocationWhiteCircle",
    style: {
      iconRotate: heading,
      ...style
    }
  }));
};
var _default = HeadingIndicator;
exports.default = _default;
//# sourceMappingURL=HeadingIndicator.js.map