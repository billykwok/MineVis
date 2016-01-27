import _ from "lodash";

export default function fillMissing(badData, schema) {
  if (schema.length === 2) {
    return [ {
        [schema[0].key]: badData.length && badData[0][schema[0].key],
        [schema[1].key]: badData.length && badData[0][schema[1].key]
      } ];
  }
  const options = schema[0].options;
  return _(options.map(option => {
      return fillMissing(
          _.filter(badData, row => row[schema[0].key] === option),
          schema.slice(1, schema.length)
        ).map(d => _.assign(d, { [schema[0].key]: option }));
    })).flatten().value();
}
