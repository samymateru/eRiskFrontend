"use client";

import { APIRequestBuilder } from "@/components/forms/base-api-client";

export async function getUserData(userId: string) {
  const data = await APIRequestBuilder.to<
    null,
    { id: string; name: string; email: string }
  >(`/users/${userId}`)
    .withMethod("GET")
    .withQueryParams({ includeDetails: true })
    .withToken()
    .fetch();

  console.log("User data:", data);
  return data;
}
export const Test = () => {
  return <div role="button">Add</div>;
};

// {/* <BaseTextAreaField
//   id={"description" as import("react-hook-form").Path<TData>}
//   label="Description"
//   register={methods.register}
//   error={methods.formState.errors}
// /> */}
