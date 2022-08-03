export function jsonFetch<ResponseT>(
  url: string,
  config: RequestInit = {},
): Promise<ResponseT> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as ResponseT);
}
