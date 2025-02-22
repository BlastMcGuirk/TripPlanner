import { fetchWithAuth, GOOGLE_APIS_URL } from "~/apis/api-utils";
import type { Trip } from "~/dto/trip";

const GOOGLE_DRIVE_URL = `${GOOGLE_APIS_URL}/drive/v3`;

const GetAllFilesUrl = `${GOOGLE_DRIVE_URL}/files?q=mimeType%3D%27tripplanner%2Ftrip%27`;
const CreateTripUrl = `${GOOGLE_DRIVE_URL}/files`

/**
 * Get all files associated with Trip Planner (via a program specific mime type).
 * @param authToken User auth token.
 * @returns All trips for the user.
 */
export async function getAllTrips(authToken?: string): Promise<Trip[]> {
    var res = await fetchWithAuth(GetAllFilesUrl, authToken);
    return res.files.map((f: any): Trip => ({
        id: f.id,
        name: f.name,
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now()),
    }));
}

/**
 * Create a new trip.
 * @param authToken User auth token.
 * @returns The id of the newly created trip.
 */
export async function createTrip(authToken?: string) {
    var res = await fetchWithAuth(CreateTripUrl, authToken, 'POST', {
        'name': 'New Trip',
        'mimeType': 'tripplanner/trip'
    });
    return res.id;
}