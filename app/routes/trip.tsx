import type { Route } from "./+types/home";
import Trip from "../trips/trip";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Trip Planner" },
    { name: "description", content: "Create a trip" },
  ];
}

export default function HomeRoute({ params }: Route.ComponentProps) {
  return <Trip tripId={params.tripId} />;
}
