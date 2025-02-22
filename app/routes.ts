import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/trip/:tripId", "./routes/trip.tsx"),
] satisfies RouteConfig;
