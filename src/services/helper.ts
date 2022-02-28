export const queryUrl = (query: any) =>
  query
    ? Object.keys(query)
        .reduce((acc, curr) => acc + `${curr}=${query[curr]}&`, "")
        .slice(0, -1)
    : "";
