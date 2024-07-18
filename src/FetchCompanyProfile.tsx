
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"

interface Profile {
    symbol :string
    description: string;
}

export const FetchCompanyProfile = () => {
    const [profiles, setProfiles] = useState<Profile[] | null>(null)
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchCompanyProfiles = async () => {
                const res = await fetch('http://localhost:8008/getApi');
                if (res) {
                    const json = await res.json();
                    const stringi = JSON.stringify(json)
                    const parse = JSON.parse(stringi)
                    setProfiles(parse);
                } else {
                    console.error("Błąd pobrania nazw firm");
                }
        };

        fetchCompanyProfiles();
    }, []);

    return (
        <div>
            {profiles ? profiles.map((profile, i) => (
            <div key={i}>
                <button onClick={()=>Navigate(`/DetailsCompany/${profile.symbol}`)}>{profile.description}
                </button>
            </div>
            )) : 'Loading...'}
        </div>
    );
};
