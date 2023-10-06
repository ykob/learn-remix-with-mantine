import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { deleteMemo } from "../data";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.memoId, "Missing memoId param");
  await deleteMemo(params.memoId);
  return redirect("/");
};
