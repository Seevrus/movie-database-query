export function jsonFetch<ResponseT>(
  url: string,
  config: RequestInit = {},
): Promise<ResponseT> {
  return fetch(url, config)
    .then((response) => response.json())
    .then(
      (response) => new Promise(
        (resolve) => setTimeout(() => resolve(response), 2000),
      ),
    )
    .then((data) => data as ResponseT);
}
