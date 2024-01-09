import { getRoute, patchRoute } from "@/components/Functions/apiRoutes";
import spinPlayerModel from "@/models/SpinPlayer";

// export const GET = async (request, { params }) => {
//   const id = params.id;
//   return await getRoute(spinPlayerModel, request, id);
// };

export const PATCH = async (request, { params }) => {
  const id = params.id;
  return await patchRoute(spinPlayerModel, request, id);
}

