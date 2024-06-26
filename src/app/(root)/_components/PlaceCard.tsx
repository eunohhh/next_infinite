import { Place } from "@/types/supabase";

function PlaceCard({ place }: { place: Place }) {
    return (
        <li className="border border-gray-200 p-4">
            <h3>{place.gather_name}</h3>
            <p>{place.sports_name}</p>
            <p>{place.region}</p>
            <p>{place.texts}</p>
            <p>{place.deadline}</p>
            <p>{place.created_by}</p>
        </li>
    );
}

export default PlaceCard;
