export const NO_OP = () => {};

export const capitalize = (text: string) =>
  `${text[0].toUpperCase()}${text.slice(1)}`;

export const isEmpty = (obj: object) =>
  !obj || (obj && Object.keys(obj).length < 1);

export const allSettled = (promises: any[]) =>
  Promise.all(
    promises.map(promise =>
      promise
        .then((value: any) => ({state: 'fulfilled', value}))
        .catch((reason: any) => ({state: 'rejected', reason})),
    ),
  );

export const chunk = (collection: any[], size: number) => {
  if (size < 1) {
    return collection;
  }

  let tmpChunk: any[] = [];

  return (collection || []).reduce((chunked, item, index) => {
    const atChunkSize = (index + 1) % size === 0;

    tmpChunk.push(item);
    if (atChunkSize || index === collection.length - 1) {
      chunked.push(tmpChunk);
      tmpChunk = [];
    }

    return chunked;
  }, []);
};

export const indexOfBy = (collection: any[], value: any, by: string) => {
  let index = -1;
  for (let i = 0; i < collection.length; i++) {
    if (collection[i][by] === value) {
      index = i;
      break;
    }
  }

  return index;
};

export const get = (obj: object, path: string, defValue: any) => {
  // If path is not defined or it has false value
  if (!path) {
    return undefined;
  }
  // Check if path is string or array. Regex : ensure that we do not have '.' and brackets.
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path)
    ? path
    : (path.match(/([^[.\]])+/g) as any[]);
  // Find value
  const result = (pathArray ?? [])?.reduce(
    (prevObj, key) => prevObj && prevObj[key],
    obj,
  );
  // If found value is undefined return default value; otherwise return the value
  return result === undefined ? defValue : result;
};

export const objToArray = (obj: object) => {
  if (!obj) return null;
  return Object.entries(obj).map(([key, value]) => ({key, ...value}));
};
