import { featureCollection, point, feature, lineString } from '@turf/helpers';
import distance from '@turf/distance';
import along from '@turf/along';
export const makePoint = point;
export const makeLineString = lineString;
export function makeLatLngBounds(northEastCoordinates, southWestCoordinates) {
  return featureCollection([point(northEastCoordinates), point(southWestCoordinates)]);
}
export const makeFeature = feature;
export function makeFeatureCollection() {
  let features = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let options = arguments.length > 1 ? arguments[1] : undefined;
  return featureCollection(features, options);
}
export function addToFeatureCollection(newFeatureCollection, newFeature) {
  return {
    ...newFeatureCollection,
    features: [...newFeatureCollection.features, newFeature]
  };
}
export const calculateDistance = distance;
export const pointAlongLine = along;
//# sourceMappingURL=geoUtils.js.map