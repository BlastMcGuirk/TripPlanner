import { redirect, useNavigate } from "react-router"
import type { Trip } from "~/dto/trip"

export interface TripCardProps {
    trip: Trip
}

export default function TripCard(props: TripCardProps) {
    let navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/trip/${props.trip.id}`)} className="flex flex-col min-h-48 justify-between rounded-3xl border border-gray-200 p-6 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer">
            <h6 className="text-xl">{props.trip.name}</h6>
            <p className="text-sm">{props.trip.startDate.toLocaleDateString()} - {props.trip.endDate.toLocaleDateString()}</p>
        </div>
    )
}