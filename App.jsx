import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://pyyzyxxcworiidgqfilq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eXp5eHhjd29yaWlkZ3FmaWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMzE5MDcsImV4cCI6MjA0MzgwNzkwN30.e6WeQO2bqfyouCWMy-sVkUXJz0cIWGLKrwua8TvkY7M");

function App() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        getCountries();
    }, []);

    async function getCountries() {
        const { data } = await supabase.from("countries").select();
        setCountries(data);
    }

    return (
        <ul>
            {countries.map((country) => (
                <li key={country.name}>{country.name}</li>
            ))}
        </ul>
    );
}

export default App;