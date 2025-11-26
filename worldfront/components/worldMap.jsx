import { useState } from "react";
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
import { Plus, Minus, ExternalLink, MapPin, Building2, Globe, ArrowLeft, Scale, Trophy } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function InteractiveWorldMap() {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [tooltipContent, setTooltipContent] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [center, setCenter] = useState([0, 20]);
    const [view, setView] = useState("map"); // "map", "country", "compare"
    const [compareCountryA, setCompareCountryA] = useState(null);
    const [compareCountryB, setCompareCountryB] = useState(null);

    // Données des pays - À remplacer par votre CSV
    const countryData = {
        "FRA": {
            nom: "France",
            code_iso2: "FR",
            niveau: "Pays membre de l'UE ou de l'EEE",
            niveau_ordre: 1,
            site: "https://www.cnil.fr",
            membre_edpb: "Oui",
            membre_afapdp: "Oui",
            adresse: "3 Place de Fontenoy TSA 80715 75334 PARIS CEDEX 07"
        },
        "DEU": {
            nom: "Allemagne",
            code_iso2: "DE",
            niveau: "Pays membre de l'UE ou de l'EEE",
            niveau_ordre: 1,
            site: "https://www.bfdi.bund.de",
            membre_edpb: "Oui",
            membre_afapdp: "Non",
            adresse: "Graurheindorfer Straße 153, 53117 Bonn, Deutschland"
        },
        "USA": {
            nom: "Etats-Unis",
            code_iso2: "US",
            niveau: "Pays en adéquation partielle",
            niveau_ordre: 3,
            site: "https://www.dataprivacyframework.gov",
            membre_edpb: "Non",
            membre_afapdp: "Non",
            adresse: "600 Pennsylvania Avenue, NW Washington, DC 20580"
        },
        "CHN": {
            nom: "Chine",
            code_iso2: "CN",
            niveau: "Loi (non adéquat)",
            niveau_ordre: 5,
            membre_edpb: "Non",
            membre_afapdp: "Non"
        },
        "BRA": {
            nom: "Brésil",
            code_iso2: "BR",
            niveau: "Autorité et loi spécifiques",
            niveau_ordre: 4,
            site: "https://www.gov.br/anpd/pt-br",
            membre_edpb: "Non",
            membre_afapdp: "Non",
            adresse: "Zona Cívico-Administrativa BL C - Brasília, DF"
        },
        "JPN": {
            nom: "Japon",
            code_iso2: "JP",
            niveau: "Pays adéquat",
            niveau_ordre: 2,
            site: "https://www.ppc.go.jp/en/",
            membre_edpb: "Non",
            membre_afapdp: "Non"
        },
        "GBR": {
            nom: "Royaume-Uni",
            code_iso2: "GB",
            niveau: "Pays adéquat",
            niveau_ordre: 2,
            site: "https://ico.org.uk/",
            membre_edpb: "Non",
            membre_afapdp: "Non",
            adresse: "Wycliffe House Water Lane Wilmslow Cheshire SK9 5AF"
        },
        "ESP": {
            nom: "Espagne",
            code_iso2: "ES",
            niveau: "Pays membre de l'UE ou de l'EEE",
            niveau_ordre: 1,
            site: "https://www.agpd.es",
            membre_edpb: "Oui",
            membre_afapdp: "Non"
        },
        "ITA": {
            nom: "Italie",
            code_iso2: "IT",
            niveau: "Pays membre de l'UE ou de l'EEE",
            niveau_ordre: 1,
            site: "https://www.garanteprivacy.it/",
            membre_edpb: "Oui",
            membre_afapdp: "Non"
        },
        "CAN": {
            nom: "Canada",
            code_iso2: "CA",
            niveau: "Pays en adéquation partielle",
            niveau_ordre: 3,
            site: "https://www.priv.gc.ca/fr/",
            membre_edpb: "Non",
            membre_afapdp: "Oui",
            adresse: "30 rue Victoria, Gatineau, Québec K1A 1H3"
        },
        "ARG": {
            nom: "Argentine",
            code_iso2: "AR",
            niveau: "Pays adéquat",
            niveau_ordre: 2,
            site: "https://www.argentina.gob.ar/aaip/datospersonales",
            membre_edpb: "Non",
            membre_afapdp: "Non"
        },
        "ZAF": {
            nom: "Afrique du Sud",
            code_iso2: "ZA",
            niveau: "Autorité et loi spécifiques",
            niveau_ordre: 4,
            site: "https://www.justice.gov.za/inforeg/",
            membre_edpb: "Non",
            membre_afapdp: "Non"
        },
        "IND": {
            nom: "Inde",
            code_iso2: "IN",
            niveau: "Loi (non adéquat)",
            niveau_ordre: 5,
            membre_edpb: "Non",
            membre_afapdp: "Non"
        },
        "RUS": {
            nom: "Russie",
            code_iso2: "RU",
            niveau: "Loi (non adéquat)",
            niveau_ordre: 5,
            membre_edpb: "Non",
            membre_afapdp: "Non"
        },
        "AUS": {
            nom: "Australie",
            code_iso2: "AU",
            niveau: "Autorité et loi spécifiques",
            niveau_ordre: 4,
            site: "https://www.oaic.gov.au/",
            membre_edpb: "Non",
            membre_afapdp: "Non"
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
        const countryCode = geo.id;
        const data = countryData[countryCode];

        if (data) {
            setSelectedCountry({ ...data, code: countryCode });
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
                        <div className="absolute top-6 right-6 z-10 bg-white px-4 py-3 rounded-lg shadow-lg border max-w-xs">
                            <p className="font-bold text-sm">{tooltipContent.nom}</p>
                            <p className="text-xs text-muted-foreground mt-1">{tooltipContent.niveau}</p>
                            {tooltipContent.membre_afapdp === "Oui" && (
                                <Badge variant="secondary" className="mt-2 text-xs">AFAPDP</Badge>
                            )}
                        </div>
                    )}

                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{ scale: 147 }}
                        width={800}
                        height={400}
                        style={{ width: "100%", height: "auto", maxHeight: "500px" }}
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
                                        const countryCode = geo.id;
                                        const data = countryData[countryCode];
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
                                                        fill: data ? "#fbbf24" : "#d1d5db",
                                                        outline: "none",
                                                        cursor: data ? "pointer" : "default",
                                                        stroke: "#f59e0b",
                                                        strokeWidth: 1,
                                                    },
                                                    pressed: { outline: "none" },
                                                }}
                                                onMouseEnter={() => {
                                                    if (data) {
                                                        setTooltipContent({
                                                            nom: data.nom,
                                                            niveau: data.niveau,
                                                            membre_afapdp: data.membre_afapdp
                                                        });
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
                        <div className="w-6 h-6 bg-green-500 rounded shadow-sm" />
                        <span className="text-sm font-medium">UE/EEE</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-500 rounded shadow-sm" />
                        <span className="text-sm font-medium">Pays adéquat</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-purple-500 rounded shadow-sm" />
                        <span className="text-sm font-medium">Adéquation partielle</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-orange-500 rounded shadow-sm" />
                        <span className="text-sm font-medium">Autorité et loi</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-red-500 rounded shadow-sm" />
                        <span className="text-sm font-medium">Loi non adéquate</span>
                    </div>
                </div>
            </div>
        );
    }

    // Fiche Pays
    if (view === "country" && selectedCountry) {
        return (
            <div className="w-full max-w-3xl mx-auto">
                <Button variant="ghost" onClick={handleBackToMap} className="mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour à la carte
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl flex items-center gap-3">
                            <Globe className="h-8 w-8 text-primary" />
                            {selectedCountry.nom}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold mb-3 text-sm text-muted-foreground flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
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

                        {selectedCountry.site && (
                            <div>
                                <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
                                    Site internet de l'autorité
                                </h4>
                                <Button variant="outline" asChild className="w-full">
                                    <a href={selectedCountry.site} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                        <ExternalLink className="h-4 w-4" />
                                        {selectedCountry.site}
                                    </a>
                                </Button>
                            </div>
                        )}

                        {selectedCountry.adresse && (
                            <div>
                                <h4 className="font-semibold mb-2 text-sm text-muted-foreground flex items-center gap-2">
                                    <Building2 className="h-4 w-4" />
                                    Adresse postale
                                </h4>
                                <p className="text-sm bg-gray-50 p-3 rounded-lg border">
                                    {selectedCountry.adresse}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4">
                            <Button onClick={handleCompare} className="flex-1">
                                <Scale className="h-4 w-4 mr-2" />
                                Comparer
                            </Button>
                            <Button variant="outline" onClick={handleBackToMap} className="flex-1">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retour à la carte
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Comparateur
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

                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Scale className="h-6 w-6" />
                        Comparateur de pays
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Pays A</label>
                            <Select
                                value={compareCountryA?.code}
                                onValueChange={(code) => setCompareCountryA(countriesList.find(c => c.code === code))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un pays" />
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

                        <div>
                            <label className="text-sm font-medium mb-2 block">Pays B</label>
                            <Select
                                value={compareCountryB?.code}
                                onValueChange={(code) => setCompareCountryB(countriesList.find(c => c.code === code))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un pays" />
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
                </div>

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
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-sm text-muted-foreground mb-2">Niveau de protection</h4>
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
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-sm text-muted-foreground mb-2">Membre AFAPDP</h4>
                                        <Badge variant={country.membre_afapdp === "Oui" ? "default" : "secondary"}>
                                            {country.membre_afapdp}
                                        </Badge>
                                    </div>

                                    {country.site && (
                                        <div>
                                            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Site de l'autorité</h4>
                                            <Button variant="outline" size="sm" asChild className="w-full">
                                                <a href={country.site} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-3 w-3 mr-2" />
                                                    Visiter
                                                </a>
                                            </Button>
                                        </div>
                                    )}

                                    {country.adresse && (
                                        <div>
                                            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Adresse</h4>
                                            <p className="text-xs bg-gray-50 p-2 rounded border">{country.adresse}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )
                    ))}
                </div>
            </div>
        );
    }
}