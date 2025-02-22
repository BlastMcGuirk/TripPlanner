import { getAllFiles, createTrip } from "~/apis/drive/drive-api";
import { useAuth } from "~/utils/auth-context";

export default function NewTripCard() {
    const { userToken } = useAuth();
    return (
        <div className="rounded-3xl border-4 border-gray-200 p-6 dark:border-gray-700 border-dashed flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer"
            onClick={() => createTrip(userToken)}>
            <h6 className="text-xl">Create New Trip</h6>
        </div>
    )
}