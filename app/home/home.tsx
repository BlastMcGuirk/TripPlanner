import type { Trip } from "~/dto/trip"
import TripCard from "./trip-card"
import NewTripCard from "./new-trip-card"
import CardGrid from "./card-grid"
import { useAuth } from "~/utils/auth-context"
import { useEffect, useState } from "react"
import { getAllFiles } from "~/apis/drive/drive-api"

export default function Home() {
    var { userToken } = useAuth();
    var [loading, setLoading] = useState(true);
    var [trips, setTrips] = useState<Trip[]>([]);

    useEffect(() => {
        if (userToken) {
            setLoading(true);
            getAllFiles(userToken)
                .then(t => {
                    setTrips(t);
                    setLoading(false);
                });
        }
    }, [userToken])

    return (
        <main className="flex items-center justify-center pt-16 pb-4 px-32">
            <div className="flex-1 flex flex-col items-center">
                <h1 className="text-6xl pb-8">Trip Planner</h1>
                <p>Plan a trip with Google and have your itinerary ready at the tap of a finger</p>

                {loading && <p>Loading...</p>}
                {!loading && userToken && (
                        <div className="block my-8 w-full">
                            <h3 className="text-2xl pb-4">Upcoming Trips</h3>
                            <CardGrid>
                                <NewTripCard />
                                {
                                    trips
                                        .filter(t => t.endDate >= new Date(Date.now()))
                                        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                                        .map(t => <TripCard key={t.id} trip={t} />)
                                }
                            </CardGrid>
        
                            <h3 className="text-2xl py-4">Past Trips</h3>
                            <CardGrid>
                            {
                                trips
                                    .filter(t => t.endDate < new Date(Date.now()))
                                    .sort((a, b) => b.startDate.getTime() - a.startDate.getTime())
                                    .map(t => <TripCard key={t.id} trip={t} />)
                            }
                            </CardGrid>
                        </div>
                        )}
        
                    {!loading && !userToken && (
                        <p className="mt-8">Login to start planning</p>
                    )}
            </div>
        </main>
    )
}