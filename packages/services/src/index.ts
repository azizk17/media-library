function parseSorting(queryString) {
  const sortParam = queryString.split("sort=")[1];
  if (sortParam) {
    const [field, direction] = sortParam.split(":");
    return { field, direction };
  }
  return null;
}
