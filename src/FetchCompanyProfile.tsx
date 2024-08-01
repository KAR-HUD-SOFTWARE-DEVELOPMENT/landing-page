import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

interface Profile {
    currency: string;
    symbol: string;
    description: string;
}

export const FetchCompanyProfile = () => {
    const [profiles, setProfiles] = useState<Profile[] | null>(null);
    const Navigate = useNavigate();
    useEffect(() => {
        const fetchCompanyProfiles = async () => {
            const res = await fetch('http://localhost:8008/getApi');
            if (res) {
                const json = await res.json();
                const stringi = JSON.stringify(json);
                const parse = JSON.parse(stringi);
                setProfiles(parse);
            } else {
                console.error("Błąd pobrania nazw firm");
            }
        };

        fetchCompanyProfiles();
    }, []);



    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        Navigate(`/DetailsCompany/${e.target.value}`);
    };

    return (
        <div>
            {profiles ? (
                <select onChange={handleSelectChange}>
                    <option value="" disabled>Wybierz firmę</option>
                    {profiles.map((profile, i) => (
                        <option key={i} value={profile.symbol}>
                            {profile.description}
                        </option>
                    ))}
                </select>
            ) : 'Loading...'}
        </div>
    );
};
