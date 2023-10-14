import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { createNewMemo } from "~/data";

export const loader = () => {
  return redirect("/");
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  let error = null;
  let memo = null;
  let success = false;

  try {
    memo = await createNewMemo(updates);
    success = true;
  } catch (e) {
    error = e instanceof Error ? e.message : "Occuered unknown error.";
  }
  return json({
    error,
    memo,
    success,
  });
};
