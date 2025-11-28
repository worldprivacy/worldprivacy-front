import { useState, useEffect } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
} from "react-simple-maps";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Minus, MapPin, ArrowLeft, Scale, Trophy } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

export default function InteractiveWorldMap() {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [tooltipContent, setTooltipContent] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [center, setCenter] = useState([0, 20]);
    const [view, setView] = useState("map");
    const [compareCountryA, setCompareCountryA] = useState(null);
    const [compareCountryB, setCompareCountryB] = useState(null);
    const [countryData, setCountryData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCountryData();
    }, []);

    const fetchCountryData = async () => {
        try {
            const res = await fetch("/api/countries");
            const response = await res.json();
            console.log("API Response:", response);

            if (response.success && response.data && response.data.pays) {
                const formattedData = {};

                const niveauOrdre = {
                    "Pays membre de l'UE ou de l'EEE": 1,
                    "Pays adéquat": 2,
                    "Pays en adéquation partielle": 3,
                    "Autorité et loi spécifiques": 4,
                    "Loi (non adéquat)": 5,
                    "Pas de loi": 6
                };

                const iso2ToIso3 = {
                    "AF": "AFG", "ZA": "ZAF", "AL": "ALB", "DZ": "DZA", "DE": "DEU",
                    "AD": "AND", "AO": "AGO", "AG": "ATG", "SA": "SAU", "AR": "ARG",
                    "AM": "ARM", "AU": "AUS", "AT": "AUT", "AZ": "AZE", "BS": "BHS",
                    "BH": "BHR", "BD": "BGD", "BB": "BRB", "BE": "BEL", "BZ": "BLZ",
                    "BJ": "BEN", "BM": "BMU", "BT": "BTN", "BY": "BLR", "MM": "MMR",
                    "BO": "BOL", "BA": "BIH", "BW": "BWA", "BR": "BRA", "BN": "BRN",
                    "BG": "BGR", "BF": "BFA", "BI": "BDI", "KH": "KHM", "CM": "CMR",
                    "CA": "CAN", "CV": "CPV", "CL": "CHL", "CN": "CHN", "CY": "CYP",
                    "CO": "COL", "KM": "COM", "CG": "COG", "KP": "PRK", "KR": "KOR",
                    "CR": "CRI", "CI": "CIV", "HR": "HRV", "CU": "CUB", "DK": "DNK",
                    "DJ": "DJI", "DM": "DMA", "EG": "EGY", "AE": "ARE", "EC": "ECU",
                    "ER": "ERI", "ES": "ESP", "EE": "EST", "US": "USA", "ET": "ETH",
                    "FJ": "FJI", "FI": "FIN", "FR": "FRA", "GA": "GAB", "GM": "GMB",
                    "GE": "GEO", "GH": "GHA", "GI": "GIB", "GR": "GRC", "GD": "GRD",
                    "GL": "GRL", "GP": "GLP", "GT": "GTM", "GG": "GGY", "GN": "GIN",
                    "GQ": "GNQ", "GW": "GNB", "GY": "GUY", "GF": "GUF", "HT": "HTI",
                    "HN": "HND", "HK": "HKG", "HU": "HUN", "IM": "IMN", "KY": "CYM",
                    "FO": "FRO", "IN": "IND", "ID": "IDN", "IR": "IRN", "IQ": "IRQ",
                    "IE": "IRL", "IS": "ISL", "IL": "ISR", "IT": "ITA", "JM": "JAM",
                    "JP": "JPN", "JE": "JEY", "JO": "JOR", "KZ": "KAZ", "KE": "KEN",
                    "KG": "KGZ", "KI": "KIR", "XK": "XKX", "KW": "KWT", "LA": "LAO",
                    "LS": "LSO", "LV": "LVA", "LB": "LBN", "LR": "LBR", "LY": "LBY",
                    "LI": "LIE", "LT": "LTU", "LU": "LUX", "MO": "MAC", "MK": "MKD",
                    "MG": "MDG", "MY": "MYS", "MW": "MWI", "MV": "MDV", "ML": "MLI",
                    "MT": "MLT", "MA": "MAR", "MH": "MHL", "MQ": "MTQ", "MU": "MUS",
                    "MR": "MRT", "YT": "MYT", "MX": "MEX", "FM": "FSM", "MD": "MDA",
                    "MC": "MCO", "MN": "MNG", "ME": "MNE", "MZ": "MOZ", "NA": "NAM",
                    "NR": "NRU", "NP": "NPL", "NI": "NIC", "NE": "NER", "NG": "NGA",
                    "NO": "NOR", "NC": "NCL", "NZ": "NZL", "OM": "OMN", "UG": "UGA",
                    "UZ": "UZB", "PK": "PAK", "PW": "PLW", "PS": "PSE", "PA": "PAN",
                    "PG": "PNG", "PY": "PRY", "NL": "NLD", "PE": "PER", "PH": "PHL",
                    "PL": "POL", "PF": "PYF", "PR": "PRI", "PT": "PRT", "QA": "QAT",
                    "CD": "COD", "CF": "CAF", "DO": "DOM", "CZ": "CZE", "RE": "REU",
                    "RO": "ROU", "GB": "GBR", "RU": "RUS", "RW": "RWA", "EH": "ESH",
                    "KN": "KNA", "LC": "LCA", "SM": "SMR", "VC": "VCT", "SB": "SLB",
                    "SV": "SLV", "WS": "WSM", "ST": "STP", "SN": "SEN", "RS": "SRB",
                    "SC": "SYC", "SL": "SLE", "SG": "SGP", "SK": "SVK", "SI": "SVN",
                    "SO": "SOM", "SW": "SWE", "SD": "SDN", "SS": "SSD", "LK": "LKA",
                    "SE": "SWE", "CH": "CHE", "SR": "SUR", "SZ": "SWZ", "SY": "SYR",
                    "TJ": "TJK", "TW": "TWN", "TZ": "TZA", "TD": "TCD", "TF": "ATF",
                    "TH": "THA", "TL": "TLS", "TG": "TGO", "TO": "TON", "TT": "TTO",
                    "TN": "TUN", "TM": "TKM", "TR": "TUR", "TV": "TUV", "UA": "UKR",
                    "UY": "URY", "VU": "VUT", "VA": "VAT", "VE": "VEN", "VN": "VNM",
                    "YE": "YEM", "ZM": "ZMB", "ZW": "ZWE"
                };

                response.data.pays.forEach(pays => {
                    const iso3 = iso2ToIso3[pays.code_pays_iso];
                    if (iso3) {
                        formattedData[iso3] = {
                            nom: pays.nom_pays,
                            code_iso2: pays.code_pays_iso,
                            niveau: pays.nv_protection.trim(),
                            niveau_ordre: niveauOrdre[pays.nv_protection.trim()] || 6,
                            zone: pays.zone
                        };
                    }
                });

                console.log(`${Object.keys(formattedData).length} pays chargés`);
                setCountryData(formattedData);
            }

            setLoading(false);
        } catch (error) {
            console.error("Erreur chargement:", error);
            setLoading(false);
        }
    };

    const getCountryColor = (niveau) => {
        switch (niveau) {
            case "Pays membre de l'UE ou de l'EEE": return "#10b981";
            case "Pays adéquat": return "#3b82f6";
            case "Pays en adéquation partielle": return "#8b5cf6";
            case "Autorité et loi spécifiques": return "#f59e0b";
            case "Loi (non adéquat)": return "#ef4444";
            case "Pas de loi": return "#9ca3af";
            default: return "#e5e7eb";
        }
    };

    const handleZoomIn = () => {
        if (zoom < 4) setZoom(zoom * 1.5);
    };

    const handleZoomOut = () => {
        if (zoom > 1) setZoom(zoom / 1.5);
    };

    const handleCountryClick = (geo) => {
        const englishName = geo.properties?.name;

        // Mapping des noms anglais (GeoJSON) vers noms français (API)
        const nameMapping = {
            "France": "France",
            "Germany": "Allemagne",
            "United States of America": "Etats-Unis",
            "China": "Chine",
            "Brazil": "Brésil",
            "Japan": "Japon",
            "United Kingdom": "Royaume-Uni",
            "Spain": "Espagne",
            "Italy": "Italie",
            "Canada": "Canada",
            "Argentina": "Argentine",
            "South Africa": "Afrique du Sud",
            "India": "Inde",
            "Russia": "Russie",
            "Australia": "Australie",
            "Algeria": "Algérie",
            "Mauritania": "Mauritanie",
            "Sudan": "Soudan",
            "Venezuela": "Venezuela",
            "Mexico": "Mexique",
            "Belgium": "Belgique",
            "Netherlands": "Pays-Bas",
            "Portugal": "Portugal",
            "Poland": "Pologne",
            "Switzerland": "Suisse",
            "Austria": "Autriche",
            "Sweden": "Suède",
            "Norway": "Norvège",
            "Denmark": "Danemark",
            "Finland": "Finlande",
            "Greece": "Grèce",
            "Turkey": "Turquie",
            "Egypt": "Egypte",
            "Morocco": "Maroc",
            "Tunisia": "Tunisie",
            "Kenya": "Kenya",
            "Nigeria": "Nigeria",
            "South Korea": "Corée du Sud",
            "Indonesia": "Indonésie",
            "Thailand": "Thaïlande",
            "Vietnam": "Viêt Nam",
            "Philippines": "Philippines",
            "Malaysia": "Malaisie",
            "Singapore": "Singapour",
            "New Zealand": "Nouvelle-Zélande",
            "Chile": "Chili",
            "Colombia": "Colombie",
            "Peru": "Pérou",
            "Ukraine": "Ukraine",
            "Romania": "Roumanie",
            "Czech Republic": "République Tchèque",
            "Hungary": "Hongrie",
            "Ireland": "Irlande",
            "Croatia": "Croatie",
            "Bulgaria": "Bulgarie",
            "Serbia": "Serbie",
            "Slovakia": "Slovaquie",
            "Slovenia": "Slovénie",
            "Lithuania": "Lituanie",
            "Latvia": "Lettonie",
            "Estonia": "Estonie"
        };

        const frenchName = nameMapping[englishName] || englishName;

        const foundCountry = Object.entries(countryData).find(([code, data]) =>
            data.nom.trim().toLowerCase() === frenchName.trim().toLowerCase()
        );

        console.log("Clic:", englishName, "→", frenchName, foundCountry ? "✓" : "✗");

        if (!foundCountry) {
            // Debug : afficher les noms similaires
            const similar = Object.entries(countryData)
                .filter(([code, data]) => data.nom.toLowerCase().includes(frenchName.toLowerCase().substring(0, 4)))
                .map(([code, data]) => data.nom);
            console.log("Noms similaires dans l'API:", similar);
        }

        if (foundCountry) {
            const [code, data] = foundCountry;
            setSelectedCountry({ ...data, code });
            setView("country");
        }
    };

    const handleBackToMap = () => {
        setView("map");
        setSelectedCountry(null);
    };

    const handleCompare = () => {
        if (selectedCountry) {
            setCompareCountryA(selectedCountry);
            setView("compare");
        }
    };

    const getMostProtective = () => {
        if (!compareCountryA || !compareCountryB) return null;
        if (compareCountryA.niveau_ordre < compareCountryB.niveau_ordre) return "A";
        if (compareCountryB.niveau_ordre < compareCountryA.niveau_ordre) return "B";
        return "equal";
    };

    if (loading) {
        return <div className="text-center py-12">Chargement de la carte...</div>;
    }

    // Vue Carte
    if (view === "map") {
        return (
            <div className="w-full space-y-6">
                <div className="relative border-4 border-primary rounded-3xl overflow-hidden bg-gray-50">
                    <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                        <Button variant="outline" size="icon" onClick={handleZoomIn} className="bg-white shadow-lg">
                            <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleZoomOut} className="bg-white shadow-lg">
                            <Minus className="h-4 w-4" />
                        </Button>
                    </div>

                    {tooltipContent && (
                        <div className="absolute top-6 right-6 z-10 bg-white px-4 py-3 rounded-lg shadow-lg border">
                            <p className="font-bold text-sm">{tooltipContent.nom}</p>
                            <p className="text-xs text-muted-foreground">{tooltipContent.niveau}</p>
                        </div>
                    )}

                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{ scale: 147 }}
                        width={800}
                        height={400}
                        style={{ width: "100%", height: "auto" }}
                    >
                        <ZoomableGroup
                            zoom={zoom}
                            center={center}
                            onMoveEnd={({ coordinates, zoom: newZoom }) => {
                                setCenter(coordinates);
                                setZoom(newZoom);
                            }}
                        >
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        const data = countryData[geo.id];
                                        const fillColor = data ? getCountryColor(data.niveau) : "#e5e7eb";

                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                fill={fillColor}
                                                stroke="#ffffff"
                                                strokeWidth={0.5}
                                                style={{
                                                    default: { outline: "none" },
                                                    hover: {
                                                        fill: data ? fillColor : "#d1d5db",
                                                        outline: "none",
                                                        cursor: data ? "pointer" : "default",
                                                        stroke: "#f59e0b",
                                                        strokeWidth: 1,
                                                    },
                                                    pressed: { outline: "none" },
                                                }}
                                                onMouseEnter={() => {
                                                    if (data) {
                                                        setTooltipContent({ nom: data.nom, niveau: data.niveau });
                                                    }
                                                }}
                                                onMouseLeave={() => setTooltipContent(null)}
                                                onClick={() => handleCountryClick(geo)}
                                            />
                                        );
                                    })
                                }
                            </Geographies>
                        </ZoomableGroup>
                    </ComposableMap>
                </div>

                <div className="flex flex-wrap gap-4 justify-center bg-white p-6 rounded-2xl shadow-sm border">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-500 rounded" />
                        <span className="text-sm font-medium">UE/EEE</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-500 rounded" />
                        <span className="text-sm font-medium">Pays adéquat</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-purple-500 rounded" />
                        <span className="text-sm font-medium">Adéquation partielle</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-orange-500 rounded" />
                        <span className="text-sm font-medium">Autorité et loi</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-red-500 rounded" />
                        <span className="text-sm font-medium">Loi non adéquate</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-400 rounded" />
                        <span className="text-sm font-medium">Pas de loi</span>
                    </div>
                </div>
            </div>
        );
    }

    // Vue Fiche Pays
    if (view === "country" && selectedCountry) {
        return (
            <div className="w-full max-w-3xl mx-auto">
                <Button variant="ghost" onClick={handleBackToMap} className="mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour à la carte
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">{selectedCountry.nom}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold mb-3 text-sm text-muted-foreground">
                                Niveau de protection
                            </h4>
                            <Badge
                                variant="outline"
                                className="text-base px-4 py-2"
                                style={{
                                    borderColor: getCountryColor(selectedCountry.niveau),
                                    backgroundColor: `${getCountryColor(selectedCountry.niveau)}15`,
                                    color: getCountryColor(selectedCountry.niveau),
                                }}
                            >
                                {selectedCountry.niveau}
                            </Badge>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button onClick={handleCompare} className="flex-1">
                                <Scale className="h-4 w-4 mr-2" />
                                Comparer
                            </Button>
                            <Button variant="outline" onClick={handleBackToMap} className="flex-1">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retour
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Vue Comparateur
    if (view === "compare") {
        const mostProtective = getMostProtective();
        const countriesList = Object.entries(countryData).map(([code, data]) => ({
            code,
            ...data
        }));

        return (
            <div className="w-full max-w-6xl mx-auto">
                <Button variant="ghost" onClick={handleBackToMap} className="mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour à la carte
                </Button>

                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Scale className="h-6 w-6" />
                    Comparateur de pays
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Select
                        value={compareCountryA?.code}
                        onValueChange={(code) => setCompareCountryA(countriesList.find(c => c.code === code))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pays A" />
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
                        onValueChange={(code) => setCompareCountryB(countriesList.find(c => c.code === code))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pays B" />
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

                {mostProtective && mostProtective !== "equal" && (
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-6 flex items-center gap-3">
                        <Trophy className="h-6 w-6 text-green-600" />
                        <p className="font-semibold text-green-900">
                            {mostProtective === "A" ? compareCountryA.nom : compareCountryB.nom} offre le niveau de protection le plus élevé
                        </p>
                    </div>
                )}

                {mostProtective === "equal" && (
                    <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 mb-6">
                        <p className="font-semibold text-blue-900">
                            Les deux pays ont le même niveau de protection
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[compareCountryA, compareCountryB].map((country, idx) => (
                        country && (
                            <Card key={idx} className={mostProtective === (idx === 0 ? "A" : "B") ? "border-2 border-green-500" : ""}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        {mostProtective === (idx === 0 ? "A" : "B") && (
                                            <Trophy className="h-5 w-5 text-green-600" />
                                        )}
                                        {country.nom}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Badge
                                        variant="outline"
                                        style={{
                                            borderColor: getCountryColor(country.niveau),
                                            backgroundColor: `${getCountryColor(country.niveau)}15`,
                                            color: getCountryColor(country.niveau),
                                        }}
                                    >
                                        {country.niveau}
                                    </Badge>
                                </CardContent>
                            </Card>
                        )
                    ))}
                </div>
            </div>
        );
    }
}