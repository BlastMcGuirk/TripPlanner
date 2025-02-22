import type { Route } from "./+types/home";
import Home from "../home/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trip Planner" },
    { name: "description", content: "Select a trip to plan" },
  ];
}

export default function HomeRoute() {
  return <Home />;
}
