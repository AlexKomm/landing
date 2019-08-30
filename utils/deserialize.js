let _isUndefined = require('lodash/isUndefined');
let _isArray = require('lodash/isArray');
let _isString = require('lodash/isString');
let _map = require('lodash/map');
let _partial = require('lodash/partial');
let _each = require('lodash/each');
let _camelCase = require('lodash/camelCase');
let _memoize = require('lodash/memoize');
let _chain = require('lodash/chain');
let _find = require('lodash/find');
let _clone = require('lodash/clone');
let _compact = require('lodash/compact');

function parseResourceData(response, data) {
  if (!data) {
    return data;
  }
  if (_isArray(data)) {
    return _map(data, _partial(parseResourceDataObject, response));
  } else {
    return parseResourceDataObject(response, data);
  }
}

function parseResourceDataObject(response, data) {
  let result = _clone(data);
  _each(data.attributes, function(value, name) {
    Object.defineProperty(result, _camelCase(name), { value, enumerable: true });
  });
  _each(data.relationships, function(value, name) {
    if (_isArray(value.data)) {
      Object.defineProperty(result, _camelCase(name), {
        get: _memoize(function() {
          let related = _map(value.data, function(related) {
            let resdata = _find(response.included, function(included) {
              return included.id === related.id && included.type === related.type;
            });
            if (resdata) return parseResourceDataObject(response, resdata);
          });
          return _compact(related);
        }),
        enumerable: true,
      });
    } else if (value.data) {
      Object.defineProperty(result, _camelCase(name), {
        get: _memoize(function() {
          let resdata = _find(response.included, function(included) {
            return included.id === value.data.id && included.type === value.data.type;
          });
          return resdata ? parseResourceDataObject(response, resdata) : null;
        }),
        enumerable: true,
      });
    }
  });
  return result;
}

export default function(data) {
  const response = _isString(data) ? JSON.parse(data) : data;
  if (!_isUndefined(response.data)) response.data = parseResourceData(response, response.data);
  return response;
}
