import {APIRequestBuilder} from "@/components/forms/base-api-client";
const BASE_URL = process.env.NEXT_PUBLIC_API_EXTERNAL_URL || "https://your-api.com";

export async function fetchData<T>(url: string): Promise<T> {
    return await APIRequestBuilder.to<undefined, T>(url)
      .withMethod("GET")
      .withToken()
      .fetch();
}

export async function fetchDataExternal<T>(url: string): Promise<T> {
    return await APIRequestBuilder.to<undefined, T>(
      url,
      `${BASE_URL}`
  )
      .withMethod("GET")
      .withToken()
      .fetch();
}
