import { Route } from ".react-router/types/app/routes/order/+types/layout";
import { available } from "@/utils/flags";
import { Outlet, redirect, useLoaderData } from "react-router";

export const loader = async ({ request }: Route.LoaderArgs) => {

  const url = new URL(request.url);
  try {
    const pathname = url.pathname;

    const isAvailable = await available();

    if (!isAvailable && pathname !== "/order/busy") {
      return redirect("/order/busy");
    }

    return {
      available: isAvailable
    }
  } catch (error) {
    return {
      available: false
    }
  }
}

export default function () {
  const { available } = useLoaderData<typeof loader>();

  return <Outlet />
}
