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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Plus, Minus, ArrowLeft, Scale, Trophy, X, ChevronDown } from "lucide-react";

// URL pour les données de la carte GeoJSON
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

// --- Mappings et Constantes (Vos données) ---
const niveauCouleurs = {
    "Pays membre de l'UE ou de l'EEE": "#10b981",
    "Pays adéquat": "#3b82f6",
    "Pays en adéquation partielle": "#8b5cf6",
    "Autorité et loi spécifiques": "#f59e0b",
    "Loi (non adéquat)": "#ef4444",
    "Pas de loi": "#9ca3af",
};

const niveauOrdre = {
    "Pays membre de l'UE ou de l'EEE": 1,
    "Pays adéquat": 2,
    "Pays en adéquation partielle": 3,
    "Autorité et loi spécifiques": 4,
    "Loi (non adéquat)": 5,
    "Pas de loi": 6
};

const getCountryColor = (niveau) => {
    return niveauCouleurs[niveau] || "#e5e7eb";
};

// Mappings ISO-2 vers ISO-3 Numérique (doit être complet pour tous les pays de l'API)
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
    "JE": "832", "JO": "400", "KZ": "398", "KE": "404", "KG": "417",
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
// --- Fin des Mappings ---


export default function InteractiveWorldMap() {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [tooltipContent, setTooltipContent] = useState(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [center, setCenter] = useState([0, 20]);
    const [sidebarMode, setSidebarMode] = useState(null);
    const [compareCountryB, setCompareCountryB] = useState(null);
    const [countryData, setCountryData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showLegend, setShowLegend] = useState(false);

    // État pour gérer l'affichage conditionnel (Desktop vs Mobile Dialog)
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    // Fonction de récupération des données pays
    const fetchCountryData = async () => {
        try {
            const res = await fetch("/api/countries");
            const response = await res.json();

            if (response.success && response.data && response.data.pays) {
                const formattedData = {};

                response.data.pays.forEach(pays => {
                    const numericCode = iso2ToNumeric[pays.code_pays_iso];
                    if (numericCode) {
                        const niveauTrimmed = pays.nv_protection.trim();
                        formattedData[numericCode] = {
                            nom: pays.nom_pays,
                            code_iso2: pays.code_pays_iso,
                            niveau: niveauTrimmed,
                            niveau_ordre: niveauOrdre[niveauTrimmed] || 6,
                            zone: pays.zone
                        };
                    }
                });

                setCountryData(formattedData);
            }
            setLoading(false);
        } catch (error) {
            console.error("Erreur chargement des données:", error);
            setLoading(false);
        }
    };

    // useEffect pour le chargement des données et la détection de taille d'écran
    useEffect(() => {
        fetchCountryData();

        // Détection de la taille d'écran (basée sur 'lg' de Tailwind: 1024px)
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleZoomIn = () => {
        if (zoom < 4) setZoom(zoom * 1.5);
    };

    const handleZoomOut = () => {
        if (zoom > 1) setZoom(zoom / 1.5);
    };

    const handleCountryClick = (geo) => {
        const data = countryData[geo.id];

        if (data) {
            setSelectedCountry({ ...data, code: geo.id });
            setSidebarMode(null);
            setCompareCountryB(null);
        }
    };

    const getMostProtective = (countryA, countryB) => {
        if (!countryA || !countryB) return null;
        if (countryA.niveau_ordre < countryB.niveau_ordre) return "A";
        if (countryB.niveau_ordre < countryA.niveau_ordre) return "B";
        return "equal";
    };

    if (loading) {
        return <div className="text-center py-12">Chargement de la carte...</div>;
    }

    // --- Rendu du Composant ---
    return (
        <div className="flex flex-col lg:flex-row w-full min-h-[400px] md:min-h-[500px] gap-4">
            {/* Carte */}
            <div className={`relative space-y-4 transition-all duration-300 ${selectedCountry ? 'lg:w-3/4' : 'w-full'}`}>
                <div className="relative border-2 md:border-4 border-primary rounded-2xl md:rounded-3xl overflow-hidden bg-gray-50 h-[400px] md:h-[600px]">

                    {/* Contrôles Zoom */}
                    <div className="absolute top-3 left-3 md:top-6 md:left-6 z-10 flex flex-col gap-2">
                        <Button variant="outline" size="icon" onClick={handleZoomIn} className="bg-white shadow-lg h-8 w-8 md:h-10 md:w-10">
                            <Plus className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleZoomOut} className="bg-white shadow-lg h-8 w-8 md:h-10 md:w-10">
                            <Minus className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                    </div>

                    {/* Tooltip Desktop uniquement */}
                    {tooltipContent && (
                        <div
                            className="hidden md:block absolute z-50 bg-white px-3 py-2 rounded-lg shadow-xl border pointer-events-none"
                            style={{
                                borderLeft: `5px solid ${getCountryColor(tooltipContent.niveau)}`,
                                top: cursorPosition.y - 40,
                                left: cursorPosition.x + 10,
                            }}
                        >
                            <p className="font-bold text-sm text-gray-800">{tooltipContent.nom}</p>
                            <p className="text-xs text-muted-foreground">{tooltipContent.niveau}</p>
                        </div>
                    )}

                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{ scale: 147 }}
                        width={800}
                        height={400}
                        style={{ width: "100%", height: "100%" }}
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
                                        const baseColor = data ? getCountryColor(data.niveau) : "#e5e7eb";
                                        const fillColor = baseColor;

                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                fill={fillColor}
                                                onMouseMove={(event) => {
                                                    setCursorPosition({ x: event.clientX, y: event.clientY });
                                                }}
                                                onMouseEnter={() => {
                                                    if (data) {
                                                        setTooltipContent({ nom: data.nom, niveau: data.niveau });
                                                    }
                                                }}
                                                onMouseLeave={() => setTooltipContent(null)}
                                                onClick={() => handleCountryClick(geo)}
                                                style={{
                                                    default: {
                                                        outline: "none",
                                                        stroke: "#ffffff",
                                                        strokeWidth: 0.5,
                                                        transition: "all 250ms",
                                                    },
                                                    hover: {
                                                        fill: baseColor,
                                                        outline: "none",
                                                        cursor: data ? "pointer" : "default",
                                                        stroke: "#000000",
                                                        strokeWidth: 1.0,
                                                        transition: "all 250ms",
                                                    },
                                                    pressed: { outline: "none" },
                                                }}
                                            />
                                        );
                                    })
                                }
                            </Geographies>
                        </ZoomableGroup>
                    </ComposableMap>
                </div>

                {/* Légende - Collapsible sur mobile */}
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                    <button
                        onClick={() => setShowLegend(!showLegend)}
                        className="w-full flex items-center justify-between p-3 md:hidden"
                    >
                        <span className="text-sm font-semibold">Légende</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${showLegend ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`${showLegend ? 'block' : 'hidden'} md:flex flex-wrap gap-3 md:gap-4 justify-center p-3 md:p-4`}>
                        {Object.entries(niveauCouleurs).map(([niveau, color]) => (
                            <div key={niveau} className="flex items-center gap-2">
                                <div className="w-3 h-3 md:w-4 md:h-4 rounded" style={{ backgroundColor: color }} />
                                <span className="text-xs font-medium">{niveau}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar Desktop / Dialog Mobile */}
            {selectedCountry && (
                <>
                    {/* Desktop Sidebar (visible uniquement sur lg:block) */}
                    <div className="hidden lg:block lg:w-1/4">
                        <Card className="h-full">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xl">{selectedCountry.nom}</CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedCountry(null)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="pt-2">
                                {sidebarMode !== 'compare' && (
                                    <div className="space-y-4">
                                        <div className="pt-2">
                                            <h4 className="font-semibold mb-1 text-xs text-muted-foreground">
                                                Niveau de protection
                                            </h4>
                                            <Badge
                                                variant="outline"
                                                className="text-sm px-3 py-1"
                                                style={{
                                                    borderColor: getCountryColor(selectedCountry.niveau),
                                                    backgroundColor: `${getCountryColor(selectedCountry.niveau)}15`,
                                                    color: getCountryColor(selectedCountry.niveau),
                                                }}
                                            >
                                                {selectedCountry.niveau}
                                            </Badge>
                                        </div>
                                        <Button onClick={() => setSidebarMode('compare')} className="w-full mt-4">
                                            <Scale className="h-4 w-4 mr-2" />
                                            Comparer avec...
                                        </Button>
                                    </div>
                                )}
                                {/* Mode Comparaison PC */}
                                {sidebarMode === 'compare' && (
                                    <div className="space-y-4 pt-2">
                                        <h4 className="text-sm font-semibold mb-3">Comparer avec :</h4>
                                        <Select
                                            value={compareCountryB?.code}
                                            onValueChange={(code) => setCompareCountryB(countryData[code])}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner un pays" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(countryData)
                                                    .filter(([code]) => code !== selectedCountry.code)
                                                    .map(([code, data]) => (
                                                        <SelectItem key={code} value={code}>
                                                            {data.nom}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>

                                        {compareCountryB && (
                                            <div className="space-y-3 pt-3 border-t">
                                                <h5 className="text-sm font-semibold">Comparaison</h5>
                                                <Card className="p-3">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="font-bold text-sm">{compareCountryB.nom}</p>
                                                            <Badge
                                                                className="mt-1"
                                                                style={{
                                                                    borderColor: getCountryColor(compareCountryB.niveau),
                                                                    backgroundColor: `${getCountryColor(compareCountryB.niveau)}15`,
                                                                    color: getCountryColor(compareCountryB.niveau),
                                                                }}
                                                            >
                                                                {compareCountryB.niveau}
                                                            </Badge>
                                                        </div>
                                                        {getMostProtective(selectedCountry, compareCountryB) === "B" && (
                                                            <Trophy className="h-5 w-5 text-green-500" />
                                                        )}
                                                    </div>
                                                </Card>

                                                <Card className="p-3">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="font-bold text-sm">{selectedCountry.nom}</p>
                                                            <Badge
                                                                className="mt-1"
                                                                style={{
                                                                    borderColor: getCountryColor(selectedCountry.niveau),
                                                                    backgroundColor: `${getCountryColor(selectedCountry.niveau)}15`,
                                                                    color: getCountryColor(selectedCountry.niveau),
                                                                }}
                                                            >
                                                                {selectedCountry.niveau}
                                                            </Badge>
                                                        </div>
                                                        {getMostProtective(selectedCountry, compareCountryB) === "A" && (
                                                            <Trophy className="h-5 w-5 text-green-500" />
                                                        )}
                                                    </div>
                                                </Card>

                                                <Button variant="outline" onClick={() => setSidebarMode(null)} className="w-full mt-2">
                                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                                    Retour
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Mobile Dialog (Rendu uniquement si ce N'EST PAS un grand écran pour éviter le conflit ARIA) */}
                    {!isLargeScreen && (
                        <Dialog open={!!selectedCountry} onOpenChange={() => setSelectedCountry(null)}>
                            <DialogContent className="lg:hidden max-w-[90vw]">
                                <DialogHeader>
                                    <DialogTitle>{selectedCountry.nom}</DialogTitle>
                                    <DialogDescription className="sr-only">
                                        Informations détaillées et comparaison pour {selectedCountry.nom}.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    {sidebarMode !== 'compare' && (
                                        <>
                                            <div>
                                                <h4 className="font-semibold mb-2 text-xs text-muted-foreground">
                                                    Niveau de protection
                                                </h4>
                                                <Badge
                                                    variant="outline"
                                                    style={{
                                                        borderColor: getCountryColor(selectedCountry.niveau),
                                                        backgroundColor: `${getCountryColor(selectedCountry.niveau)}15`,
                                                        color: getCountryColor(selectedCountry.niveau),
                                                    }}
                                                >
                                                    {selectedCountry.niveau}
                                                </Badge>
                                            </div>
                                            <Button onClick={() => setSidebarMode('compare')} className="w-full">
                                                <Scale className="h-4 w-4 mr-2" />
                                                Comparer
                                            </Button>
                                        </>
                                    )}

                                    {sidebarMode === 'compare' && (
                                        <div className="space-y-4">
                                            <Select
                                                value={compareCountryB?.code}
                                                onValueChange={(code) => setCompareCountryB(countryData[code])}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner un pays" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.entries(countryData)
                                                        .filter(([code]) => code !== selectedCountry.code)
                                                        .map(([code, data]) => (
                                                            <SelectItem key={code} value={code}>
                                                                {data.nom}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>

                                            {compareCountryB && (
                                                <div className="space-y-3">
                                                    <Card className="p-3">
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <p className="font-bold text-sm">{compareCountryB.nom}</p>
                                                                <Badge className="mt-1 text-xs"
                                                                       style={{
                                                                           borderColor: getCountryColor(compareCountryB.niveau),
                                                                           backgroundColor: `${getCountryColor(compareCountryB.niveau)}15`,
                                                                           color: getCountryColor(compareCountryB.niveau),
                                                                       }}
                                                                >
                                                                    {compareCountryB.niveau}
                                                                </Badge>
                                                            </div>
                                                            {getMostProtective(selectedCountry, compareCountryB) === "B" && (
                                                                <Trophy className="h-5 w-5 text-green-500" />
                                                            )}
                                                        </div>
                                                    </Card>

                                                    <Card className="p-3">
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <p className="font-bold text-sm">{selectedCountry.nom}</p>
                                                                <Badge className="mt-1 text-xs"
                                                                       style={{
                                                                           borderColor: getCountryColor(selectedCountry.niveau),
                                                                           backgroundColor: `${getCountryColor(selectedCountry.niveau)}15`,
                                                                           color: getCountryColor(selectedCountry.niveau),
                                                                       }}
                                                                >
                                                                    {selectedCountry.niveau}
                                                                </Badge>
                                                            </div>
                                                            {getMostProtective(selectedCountry, compareCountryB) === "A" && (
                                                                <Trophy className="h-5 w-5 text-green-500" />
                                                            )}
                                                        </div>
                                                    </Card>

                                                    <Button variant="outline" onClick={() => setSidebarMode(null)} className="w-full">
                                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                                        Retour
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </>
            )}
        </div>
    );
}