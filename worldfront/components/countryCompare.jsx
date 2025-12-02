import { useState, useEffect } from "react";
import { Scale, Trophy } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// --- Données et Mappings Nécessaires (Copie des données centrales) ---

// Définition des couleurs et de l'ordre de protection
const niveauCouleurs = {
    "Pays membre de l'UE ou de l'EEE": "#10b981",
    "Pays adéquat": "#3b82f6",
    "Pays en adéquation partielle": "#8b5cf6",
    "Autorité et loi spécifiques": "#f59e0b",
    "Loi (non adéquat)": "#ef4444",
    "Pas de loi": "#9ca3af",
};

const niveauOrdre = {
    "Pays membre de l'UE ou de l'EEE": 1, "Pays adéquat": 2, "Pays en adéquation partielle": 3,
    "Autorité et loi spécifiques": 4, "Loi (non adéquat)": 5, "Pas de loi": 6
};

// Fonction utilitaire pour obtenir la couleur
const getCountryColor = (niveau) => {
    return niveauCouleurs[niveau] || "#e5e7eb";
};

// ⚠️ MAPPING DES CODES (Nécessaire pour le chargement des données,
// car l'API renvoie des codes ISO-2 et les pays doivent être indexés par quelque chose)
// J'utilise ici un code ISO-3 Numérique factice pour que la fonction soit complète.
// Si votre API retourne les pays par code ISO-2, vous n'avez pas besoin du mapping complet,
// mais juste des données brutes.
// Pour simplifier et garantir le fonctionnement, j'utiliserai les codes ISO-2 comme clés
// internes pour ce composant (si votre API le permet).
// Dans le composant de carte, nous avions besoin de l'ISO-3 Numérique pour correspondre à GeoJSON.
// Ici, une clé unique suffit. Nous utiliserons le CODE ISO-2 pour la sélection.
const iso2ToNumeric = {
    "AF": "004", "ZA": "710", "AL": "008", "DZ": "012", "DE": "276",
    "AD": "020", "AO": "024", "AG": "028", "SA": "682", "AR": "032",
    "AM": "051", "AU": "036", "AT": "040", "AZ": "031", "BS": "044",
    "BH": "048", "BD": "050", "BB": "052", "BE": "056", "BZ": "204",
    "BM": "060", "BT": "064", "BY": "112", "MM": "104", "BO": "068",
    "BA": "070", "BW": "072", "BR": "076", "BN": "096", "BG": "100",
    "BF": "854", "BI": "108", "KH": "116", "CM": "120", "CA": "124",
    "CV": "132", "CL": "152", "CN": "156", "CY": "196", "CO": "170",
    "KM": "174", "CG": "178", "KP": "408", "KR": "410", "CR": "188",
    "CI": "384", "HR": "191", "CU": "192", "DK": "208", "DJ": "262",
    "DM": "212", "EG": "818", "AE": "784", "EC": "218", "ER": "232",
    "ES": "724", "EE": "233", "US": "840", "ET": "231", "FJ": "242",
    "FI": "246", "FR": "250", "GA": "266", "GM": "270", "GE": "268",
    "GH": "288", "GI": "292", "GR": "300", "GD": "308", "GL": "304",
    "GP": "312", "GT": "320", "GG": "831", "GN": "324", "GQ": "226",
    "GW": "624", "GY": "328", "GF": "254", "HT": "332", "HN": "340",
    "HK": "344", "HU": "348", "IM": "833", "KY": "136", "FO": "234",
    "IN": "356", "ID": "360", "IR": "364", "IQ": "368", "IE": "372",
    "IS": "352", "IL": "376", "IT": "380", "JM": "388", "JP": "392",
    "JE": "832", "JO": "392", "KZ": "398", "KE": "404", "KG": "417",
    "KI": "296", "XK": "921", "KW": "414", "LA": "418", "LS": "426",
    "LV": "428", "LB": "422", "LR": "430", "LY": "434", "LI": "438",
    "LT": "440", "LU": "442", "MO": "446", "MK": "807", "MG": "450",
    "MY": "458", "MW": "454", "MV": "462", "ML": "466", "MT": "470",
    "MA": "504", "MH": "584", "MQ": "474", "MU": "480", "MR": "478",
    "YT": "175", "MX": "484", "FM": "583", "MD": "498", "MC": "492",
    "MN": "496", "ME": "499", "MZ": "508", "NA": "516", "NR": "520",
    "NP": "524", "NI": "558", "NE": "562", "NG": "566", "NO": "578",
    "NC": "540", "NZ": "554", "OM": "512", "UG": "800", "UZ": "860",
    "PK": "586", "PW": "585", "PS": "275", "PA": "591", "PG": "598",
    "PY": "600", "NL": "528", "PE": "604", "PH": "608", "PL": "616",
    "PF": "258", "PR": "630", "PT": "620", "QA": "634", "CD": "180",
    "CF": "140", "DO": "214", "CZ": "203", "RE": "638", "RO": "642",
    "GB": "826", "RU": "643", "RW": "646", "EH": "732", "KN": "659",
    "LC": "662", "SM": "674", "VC": "670", "SB": "090", "SV": "686",
    "WS": "882", "ST": "678", "SN": "686", "RS": "688", "SC": "690",
    "SL": "694", "SG": "702", "SK": "703", "SI": "705", "SO": "706",
    "SW": "752", "SD": "729", "SS": "728", "LK": "144", "SE": "752",
    "CH": "756", "SR": "740", "SZ": "748", "SY": "760", "TJ": "762",
    "TW": "158", "TZ": "834", "TD": "148", "TF": "260", "TH": "764",
    "TL": "626", "TG": "768", "TO": "776", "TT": "780", "TN": "788",
    "TM": "795", "TR": "792", "TV": "798", "UA": "804", "UY": "858",
    "VU": "548", "VA": "336", "VE": "862", "VN": "704", "YE": "887",
    "ZM": "894", "ZW": "716",
};


export default function CountryCompare() {
    const [compareCountryA, setCompareCountryA] = useState(null);
    const [compareCountryB, setCompareCountryB] = useState(null);
    const [countryData, setCountryData] = useState({});
    const [countriesList, setCountriesList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCountryData();
    }, []);

    const fetchCountryData = async () => {
        try {
            const res = await fetch("/api/countries");
            const response = await res.json();

            if (response.success && response.data && response.data.pays) {
                const formattedData = {};
                const list = [];

                response.data.pays.forEach(pays => {
                    const code = pays.code_pays_iso;
                    const niveauTrimmed = pays.nv_protection.trim();
                    const data = {
                        nom: pays.nom_pays,
                        code: code, // Utilisation du code ISO-2 comme clé unique
                        niveau: niveauTrimmed,
                        niveau_ordre: niveauOrdre[niveauTrimmed] || 6,
                        zone: pays.zone
                    };
                    formattedData[code] = data;
                    list.push(data);
                });

                setCountryData(formattedData);
                setCountriesList(list.sort((a, b) => a.nom.localeCompare(b.nom))); // Trier par nom
            }
            setLoading(false);
        } catch (error) {
            console.error("Erreur chargement:", error);
            setLoading(false);
        }
    };

    const getMostProtective = () => {
        if (!compareCountryA || !compareCountryB) return null;
        if (compareCountryA.niveau_ordre < compareCountryB.niveau_ordre) return "A";
        if (compareCountryB.niveau_ordre < compareCountryA.niveau_ordre) return "B";
        return "equal";
    };

    if (loading) {
        return <div className="text-center py-12">Chargement des données...</div>;
    }

    const mostProtective = getMostProtective();

    return (
        <div className="w-full max-w-6xl mx-auto py-8">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 border-b pb-3">
                Comparateur de Niveaux de Protection des Données
            </h2>

            {/* Sélecteurs de pays */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Select
                    value={compareCountryA?.code}
                    onValueChange={(code) => setCompareCountryA(countryData[code])}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le Pays A" />
                    </SelectTrigger>
                    <SelectContent>
                        {countriesList.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                                {country.nom}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={compareCountryB?.code}
                    onValueChange={(code) => setCompareCountryB(countryData[code])}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le Pays B" />
                    </SelectTrigger>
                    <SelectContent>
                        {countriesList.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                                {country.nom}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Résultat de la comparaison */}
            {compareCountryA && compareCountryB && (
                <div className="space-y-6">
                    {mostProtective && mostProtective !== "equal" && (
                        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3">
                            <Trophy className="h-6 w-6 text-green-600" />
                            <p className="font-semibold text-green-900">
                                **{mostProtective === "A" ? compareCountryA.nom : compareCountryB.nom}** offre le niveau de protection le plus élevé.
                            </p>
                        </div>
                    )}

                    {mostProtective === "equal" && (
                        <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 flex items-center gap-3">
                            <Scale className="h-6 w-6 text-blue-600" />
                            <p className="font-semibold text-blue-900">
                                Les deux pays ont le même niveau de protection des données.
                            </p>
                        </div>
                    )}
                </div>
            )}


            {/* Fiches d'information détaillées */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {[
                    { country: compareCountryA, type: "A" },
                    { country: compareCountryB, type: "B" }
                ].map(({ country, type }) => (
                    <Card
                        key={type}
                        className={`transition-all duration-300 ${
                            country && mostProtective === type ? "border-4 border-green-500 shadow-xl" : ""
                        }`}
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                {country ? country.nom : `Pays ${type}`}
                                {country && mostProtective === type && (
                                    <Trophy className="h-6 w-6 text-green-600" />
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {country ? (
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
                                            Niveau de protection
                                        </h4>
                                        <Badge
                                            variant="outline"
                                            className="text-base px-4 py-2"
                                            style={{
                                                borderColor: getCountryColor(country.niveau),
                                                backgroundColor: `${getCountryColor(country.niveau)}15`,
                                                color: getCountryColor(country.niveau),
                                            }}
                                        >
                                            {country.niveau}
                                        </Badge>
                                    </div>
                                    {/* Vous pouvez ajouter d'autres détails ici si vous en avez */}
                                    <p className="text-sm text-muted-foreground">Zone : {country.zone || 'N/A'}</p>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Sélectionnez un pays pour la comparaison.</p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}