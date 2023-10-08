import { useRouter } from "next/navigation";

export function useFetch() {
  const router = useRouter();

  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
  };

  function request(method) {
    return (url, body) => {
      const requestOptions = { method };
      if (body) {
        requestOptions.headers = { "Content-Type": "application/json" };
        requestOptions.body = JSON.stringify(body);
      }
      return fetch(url, requestOptions).then(handleResponse);
    };
  }
  async function handleResponse(response) {
    const isJson = response.headers
      ?.get("content-type")
      ?.includes("application/json");
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      if (response.status === 401) {
        router.push("/login");
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  }
}
