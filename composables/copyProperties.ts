export const copyProperties = (source: any, target: any) => {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
};
