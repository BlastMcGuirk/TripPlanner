import { fetchWithAuth, GOOGLE_APIS_URL } from "~/apis/api-utils";
import type { Trip } from "~/dto/trip";

const GOOGLE_DRIVE_URL = `${GOOGLE_APIS_URL}/drive/v3`;

const GetAllFilesUrl = `${GOOGLE_DRIVE_URL}/files?q=mimeType%3D%27tripplanner%2Ftrip%27`;
const CreateTripUrl = `${GOOGLE_DRIVE_URL}/files`

export async function getAllFiles(authToken?: string): Promise<Trip[]> {
    var res = await fetchWithAuth(GetAllFilesUrl, authToken);
    return res.files.map((f: any): Trip => ({
        id: f.id,
        name: f.name,
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now()),
    }));
}

export async function createTrip(authToken?: string) {
    var res = await fetchWithAuth(CreateTripUrl, authToken, 'POST', {
        'name': 'New Trip',
        'mimeType': 'tripplanner/trip'
    });
    return res.id;
}