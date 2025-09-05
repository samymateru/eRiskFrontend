import {
    APIRequestBuilder
} from "@/components/forms/base-api-client";

export async function fetchData<T>(url: string): Promise<T> {
    return await APIRequestBuilder.to<undefined, T>(url)
      .withMethod("GET")
      .withToken()
      .fetch();
}

export async function fetchDataExternal<T>(url: string): Promise<T> {
    return await APIRequestBuilder.to<undefined, T>(
      url,
      "http://localhost:8000"
  )
      .withMethod("GET")
      .withToken()
      .fetch();
}
