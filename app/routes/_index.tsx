import { HeadersArgs, HeadersFunction, LoaderFunctionArgs, json } from "@netlify/remix-runtime";
import { useLoaderData } from "@remix-run/react";
import { staticHeaders } from "~/lib/cache/static-headers";

export const headers: HeadersFunction = ({ loaderHeaders }: HeadersArgs) => loaderHeaders;

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const headers = await staticHeaders(request);

  return json({ context }, { headers });
};

export default function Index() {
  const { context } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Index</h1>
      <pre>{JSON.stringify(context, null, 2)}</pre>
    </div>
  );
}
