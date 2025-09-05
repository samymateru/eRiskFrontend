// lib/APIRequestBuilder.ts
import {
    ErrorMessage
} from "@/lib/utils/error_helper";
import {
    showToast
} from "@/components/toast/base_toast";
import {jsonToFormData} from "@/lib/utils";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://your-api.com";

export interface APIError {
  status: number;
  body: unknown;
}

export class APIRequestBuilder<TRequest = unknown, TResponse = unknown> {
  private url: string = "";
  private isFormData: boolean = false;
  private method: string = "GET";
  private headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  private body?: TRequest;
  private includeToken = false;

  static to<TRequest = unknown, TResponse = unknown>(
    path: string,
    baseUrl?: string
  ) {
    const builder = new APIRequestBuilder<TRequest, TResponse>();
    // Use provided baseUrl or fallback to env BASE_URL
    const base = baseUrl ?? process.env.NEXT_PUBLIC_BASE_URL ?? BASE_URL;
    builder.url = `${base}${path}`;
    return builder;
  }

  withMethod(method: string) {
    this.method = method.toUpperCase();
    return this;
  }

  withQueryParams(
    params: Record<string, string | number | boolean | undefined | null>
  ): this {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, String(value));
      }
    });

    const separator = this.url.includes("?") ? "&" : "?";
    this.url += `${separator}${query.toString()}`;

    return this;
  }

  withHeaders(headers: Record<string, string>) {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  withToken() {
    this.includeToken = true;
    return this;
  }

  asFormData(): this {
    this.isFormData = true;
    return this;
  }

  withBody(body: TRequest): this {
    this.body = body;
    return this;
  }

  async fetch(): Promise<TResponse> {
    if (this.includeToken && typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        this.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const headers = { ...this.headers };

    if (this.isFormData) {
      delete headers["Content-Type"];
    }

    try {

    const data = jsonToFormData(this.body as Record<string, unknown>)

    const response = await fetch(this.url, {
      method: this.method,
      headers: headers,
      body:
          this.isFormData ? data : JSON.stringify(this.body),
    });

    const responseBody = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = {
          status: response.status,
          body: responseBody,
      } as APIError;

      ErrorMessage(error)
    }
    if(response.status === 201) {
        showToast(responseBody.detail, "success");
    }
    return responseBody as TResponse;
    }catch (error) {
        ErrorMessage(error)
        throw error
    }
  }
}
