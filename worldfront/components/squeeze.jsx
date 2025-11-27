import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Lock, ShieldCheck, ShieldAlert, RefreshCw } from "lucide-react";
import Image from "next/image";

export default function Quizz() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const res = await fetch("/api/questions");
            const data = await res.json();
            console.log("Data:", data);

            // Mapper les données de l'API au format attendu
            const formattedQuestions = data.map(q => ({
                id: q.id,
                question_text: q.intitule,
                correct_answer: q.reponse,
                texteVrai: q.texteVrai,
                texteFaux: q.texteFaux
            }));

            setQuestions(formattedQuestions);
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors du chargement des questions:", error);
            setLoading(false);
        }
    };

    const handleAnswer = (answer) => {
        const currentQ = questions[currentQuestion];
        const isCorrect = answer === currentQ.correct_answer;
        const explanationText = isCorrect ? currentQ.texteVrai : currentQ.texteFaux;

        setUserAnswers([
            ...userAnswers,
            {
                question: currentQ.question_text,
                userAnswer: answer,
                correctAnswer: currentQ.correct_answer,
                isCorrect: isCorrect,
                explanation: explanationText
            },
        ]);

        if (currentQuestion < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestion(currentQuestion + 1);
            }, 300);
        } else {
            setTimeout(() => {
                setQuizFinished(true);
            }, 300);
        }
    };

    const calculateScore = () => {
        return userAnswers.filter((a) => a.isCorrect).length;
    };

    const getProtectionMessage = () => {
        const score = calculateScore();
        const percentage = (score / questions.length) * 100;

        if (percentage >= 80) {
            return {
                icon: <ShieldCheck className="h-16 w-16 text-green-500" />,
                title: "Félicitations ! 🎉",
                message: "Vos données sont bien protégées ! Vous avez une excellente connaissance de la protection des données personnelles.",
                color: "bg-green-50 border-green-500",
            };
        } else if (percentage >= 50) {
            return {
                icon: <ShieldAlert className="h-16 w-16 text-orange-500" />,
                title: "Attention ! ⚠️",
                message: "Vos données sont moyennement protégées. Il serait bon d'approfondir vos connaissances sur la protection des données.",
                color: "bg-orange-50 border-orange-500",
            };
        } else {
            return {
                icon: <Lock className="h-16 w-16 text-red-500" />,
                title: "Danger ! 🚨",
                message: "Vos données sont en danger ! Vous devez absolument vous informer davantage sur la protection de vos données personnelles.",
                color: "bg-red-50 border-red-500",
            };
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setUserAnswers([]);
        setQuizStarted(false);
        setQuizFinished(false);
        fetchQuestions();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl">Chargement du quiz...</p>
            </div>
        );
    }

    // Écran de démarrage
    if (!quizStarted) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                {/* Contenu */}
                <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                    <Card className="max-w-2xl w-full border-4 border-primary shadow-2xl">
                        <CardContent className="p-12 text-center space-y-6">
                            <h1 className="text-4xl font-bold">
                                Prêt à tester tes connaissances ?
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Réponds à {questions.length} questions rapides sur la protection de tes données personnelles.
                                À la fin, découvre si tes données sont "sous haute sécurité" ou "en danger"
                            </p>
                            <Button
                                size="lg"
                                className="bg-purple-900 hover:bg-purple-800 text-white px-8 py-6 text-xl"
                                onClick={() => setQuizStarted(true)}
                            >
                                Commencer le quizz
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // Écran de résultats
    if (quizFinished) {
        const score = calculateScore();
        const protectionMsg = getProtectionMessage();

        return (
            <div className="min-h-screen relative overflow-hidden">
                {/* Image de fond */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/carte-monde-couleur.jpg"
                        alt="Carte du monde"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white" />
                </div>

                <div className="relative z-10 container mx-auto px-4 py-12">
                    {/* Message de protection */}
                    <Card className={`max-w-3xl mx-auto mb-8 border-4 ${protectionMsg.color}`}>
                        <CardContent className="p-8 text-center space-y-4">
                            <div className="flex justify-center">{protectionMsg.icon}</div>
                            <h2 className="text-3xl font-bold">{protectionMsg.title}</h2>
                            <p className="text-xl">{protectionMsg.message}</p>
                            <div className="text-2xl font-bold">
                                Score : {score} / {questions.length}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Barre de progression */}
                    <div className="max-w-3xl mx-auto mb-8">
                        <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div
                                className="bg-primary h-full transition-all duration-500"
                                style={{ width: `${(score / questions.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Récapitulatif des questions */}
                    <div className="max-w-3xl mx-auto space-y-4">
                        <h3 className="text-2xl font-bold mb-6">Récapitulatif de tes réponses</h3>
                        {userAnswers.map((answer, index) => (
                            <Card
                                key={index}
                                className={`border-2 ${
                                    answer.isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
                                }`}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        {answer.isCorrect ? (
                                            <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                                        ) : (
                                            <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                                        )}
                                        <div className="flex-1">
                                            <p className="font-semibold mb-2">Question {index + 1}</p>
                                            <p className="mb-3">{answer.question}</p>
                                            <div className="flex gap-4 text-sm mb-3">
                                                <Badge variant={answer.isCorrect ? "default" : "destructive"}>
                                                    Ta réponse : {answer.userAnswer ? "Vrai" : "Faux"}
                                                </Badge>
                                                {!answer.isCorrect && (
                                                    <Badge variant="outline" className="border-green-600 text-green-600">
                                                        Bonne réponse : {answer.correctAnswer ? "Vrai" : "Faux"}
                                                    </Badge>
                                                )}
                                            </div>
                                            {/* Explication */}
                                            <div className="mt-3 p-3 bg-white rounded-lg border">
                                                <p className="text-sm text-gray-700">{answer.explanation}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Bouton recommencer */}
                    <div className="max-w-3xl mx-auto mt-8 text-center">
                        <Button
                            size="lg"
                            onClick={restartQuiz}
                            className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
                        >
                            <RefreshCw className="h-5 w-5 mr-2" />
                            Recommencer le quiz
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Écran de question
    const currentQ = questions[currentQuestion];

    // Protection si la question n'existe pas
    if (!currentQ) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl">Chargement de la question...</p>
            </div>
        );
    }

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Image de fond */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/carte-monde-couleur.jpg"
                    alt="Carte du monde"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-white/70" />
            </div>

            {/* Contenu */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <div className="max-w-4xl w-full">
                    {/* Barre de progression */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} / {questions.length}
              </span>
                            <span className="text-sm font-medium">{Math.round(progress)}%</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-primary h-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Question */}
                    <Card className="border-4 border-primary shadow-2xl">
                        <CardContent className="p-12">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                {currentQ.question_text}
                            </h2>

                            {/* Boutons Vrai/Faux */}
                            <div className="grid grid-cols-2 gap-6">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-32 text-2xl font-bold border-4 hover:bg-red-50 hover:border-red-500 transition-all"
                                    onClick={() => handleAnswer(false)}
                                >
                                    Faux
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-32 text-2xl font-bold border-4 hover:bg-green-50 hover:border-green-500 transition-all"
                                    onClick={() => handleAnswer(true)}
                                >
                                    Vrai
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}