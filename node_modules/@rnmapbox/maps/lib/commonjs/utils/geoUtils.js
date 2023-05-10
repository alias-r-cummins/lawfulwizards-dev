"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToFeatureCollection = addToFeatureCollection;
exports.makeFeature = exports.calculateDistance = void 0;
exports.makeFeatureCollection = makeFeatureCollection;
exports.makeLatLngBounds = makeLatLngBounds;
exports.pointAlongLine = exports.makePoint = exports.makeLineString = void 0;
var _helpers = require("@turf/helpers");
var _distance = _interopRequireDefault(require("@turf/distance"));
var _along = _interopRequireDefault(require("@turf/along"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const makePoint = _helpers.point;
exports.makePoint = makePoint;
const makeLineString = _helpers.lineString;
exports.makeLineString = makeLineString;
function makeLatLngBounds(northEastCoordinates, southWestCoordinates) {
  return (0, _helpers.featureCollection)([(0, _helpers.point)(northEastCoordinates), (0, _helpers.point)(southWestCoordinates)]);
}
const makeFeature = _helpers.feature;
exports.makeFeature = makeFeature;
function makeFeatureCollection() {
  let features = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let options = arguments.length > 1 ? arguments[1] : undefined;
  return (0, _helpers.featureCollection)(features, options);
}
function addToFeatureCollection(newFeatureCollection, newFeature) {
  return {
    ...newFeatureCollection,
    features: [...newFeatureCollection.features, newFeature]
  };
}
const calculateDistance = _distance.default;
exports.calculateDistance = calculateDistance;
const pointAlongLine = _along.default;
exports.pointAlongLine = pointAlongLine;
//# sourceMappingURL=geoUtils.js.map