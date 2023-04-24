export const objToQuery = (query: { [eky: string | number]: any }) => {
  if (Object.keys(query).length === 0) return '';

  return (
    '?' +
    Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&')
  );
};
