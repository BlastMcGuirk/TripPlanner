import type { Trip } from "~/dto/trip";

export interface TripProps {
    tripId: string | undefined;
}

export default function Trip(props: TripProps) {

    return (
        <main>
            {props.tripId}
        </main>
    );
}