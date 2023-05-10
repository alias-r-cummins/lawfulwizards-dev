"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyPropertiesAsDeprecated = copyPropertiesAsDeprecated;
exports.deprecatedClass = deprecatedClass;
/**
 * deprecatedClass: creates a subclass of the class, which prints deprecated warning when called
 */
function deprecatedClass(origClass, deprecationMessage) {
  const result = class extends origClass {
    constructor() {
      console.log(`Deprecated: ${deprecationMessage}`);
      super(...arguments);
    }
  };
  return result;
}

/**
 * Copy properties from origObject to newObject, but only those which not exists in newObject.
 * Calls onDeprecatedCalled callback in case a copied property is invoked.
 */
function copyPropertiesAsDeprecated(origObject, newObject, onDeprecatedCalled) {
  let accessors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const result = newObject;
  for (const [key, value] of Object.entries(origObject)) {
    if (!newObject[key]) {
      Object.defineProperty(result, key, {
        get() {
          onDeprecatedCalled(key);
          return accessors[key] ? accessors[key](value) : value;
        }
      });
    }
  }
  return result;
}
//# sourceMappingURL=deprecation.js.map