// components/word-story-card/word-story-card-data-table.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import {img} from" @/../public/bird.jpg";

import {
    ArrowUpDown,
    Plus,
    Pencil,
    ChevronDown,
    ChevronRight,
    BookOpen,
    FileText,
    Award,
    Eye,
    Volume2,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { deleteWordStoryCard, getAllWordStoryCards } from "@/app/(dashboardLayout)/teacher/dashboard/word-story-cards-create/_actions";
import { IAssessment, IMaterial, IQuiz, IWordStoryCard } from "@/types/word-story.types";
import { DeleteDialog } from "../admin/delete-dialog";
import { useState } from "react";

export function WordStoryCardDataTable() {
    const queryClient = useQueryClient();

        // State for showing/hiding quiz answers
    const [showQuizAnswers, setShowQuizAnswers] = useState<Record<string, boolean>>({});
    // State for showing/hiding assessment answers
    const [showAssessmentAnswers, setShowAssessmentAnswers] = useState<Record<string, boolean>>({});

    const toggleQuizAnswer = (quizId: string) => {
        setShowQuizAnswers(prev => ({
            ...prev,
            [quizId]: !prev[quizId]
        }));
    };

    const toggleAssessmentAnswer = (assessmentId: string, questionIndex: number) => {
        const key = `${assessmentId}-${questionIndex}`;
        setShowAssessmentAnswers(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const toggleAllAssessmentAnswers = (assessmentId: string, totalQuestions: number) => {
        const allKeys = Array.from({ length: totalQuestions }, (_, i) => `${assessmentId}-${i}`);
        const allShown = allKeys.every(key => showAssessmentAnswers[key]);
        
        const newState = { ...showAssessmentAnswers };
        if (allShown) {
            // Hide all
            allKeys.forEach(key => delete newState[key]);
        } else {
            // Show all
            allKeys.forEach(key => { newState[key] = true; });
        }
        setShowAssessmentAnswers(newState);
    };



    // Fetch word story cards data
    const { data: response, isLoading } = useQuery({
        queryKey: ["word-story-cards"],
        queryFn: () => getAllWordStoryCards(),
    });

    const data = response?.data || [];

    // Check if any card has expandable details
    const enableExpand = data.some(
        (card) => 
            (card.quizzes?.length ?? 0) > 0 || 
            (card.materials?.length ?? 0) > 0 ||
            (card.assessments?.length ?? 0) > 0
    );

    // Table columns
    const columns: ColumnDef<IWordStoryCard>[] = [
        {
            id: "expand",
            header: "",
            cell: ({ row }) => {
                const hasDetails =
                    (row.original.quizzes?.length ?? 0) > 0 ||
                    (row.original.materials?.length ?? 0) > 0 ||
                    (row.original.assessments?.length ?? 0) > 0;

                if (!hasDetails) return null;

                return (
                    <button onClick={row.getToggleExpandedHandler()} className="p-1">
                        {row.getIsExpanded() ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </button>
                );
            },
        },
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => (
                <div className="relative w-12 h-12 rounded-md overflow-hidden border bg-gray-100">
                    <Image
                        src={row.original.image}
                        alt={row.original.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                    />
                </div>
            ),
        },
        {
            accessorKey: "title",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="font-medium">{row.original.title}</div>
            ),
        },
        {
            accessorKey: "keywords",
            header: "Keywords",
            cell: ({ row }) => (
                <div className="max-w-xs">
                    <div className="flex flex-wrap gap-1">
                        {row.original.keywords.split(",").slice(0, 3).map((keyword, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                                {keyword.trim()}
                            </Badge>
                        ))}
                        {row.original.keywords.split(",").length > 3 && (
                            <Badge variant="outline" className="text-xs">
                                +{row.original.keywords.split(",").length - 3}
                            </Badge>
                        )}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => (
                <div className="max-w-xs truncate" title={row.original.description}>
                    {row.original.description}
                </div>
            ),
        },
        {
            id: "dialogTitle",
            header: "Dialog",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <span className="text-sm">{row.original.dialogTitle}</span>
                    {row.original.descriptionSound && (
                        <Volume2 className="h-3 w-3 text-muted-foreground" />
                    )}
                </div>
            ),
        },
        {
            id: "quizzes",
            header: "Quizzes",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{row.original.quizzes?.length || 0}</span>
                </div>
            ),
        },
        {
            id: "materials",
            header: "Materials",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{row.original.materials?.length || 0}</span>
                </div>
            ),
        },
        {
            id: "assessments",
            header: "Assessments",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{row.original.assessments?.length || 0}</span>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <Badge variant={row.original.status === "PUBLISHED" ? "default" : "secondary"}>
                    {row.original.status}
                </Badge>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Created",
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">
                    {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
                </span>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Link href={`/dashboard/word-story-cards/view/${row.original.id}`}>
                        <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={`/dashboard/word-story-cards/edit/${row.original.id}`}>
                        <Button size="sm" variant="ghost">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>

                    <DeleteDialog
                        id={row.original.id}
                        name={row.original.title}
                        deleteFn={async (id) => {
                            await deleteWordStoryCard(id);
                        }}
                        onDelete={() => {
                            queryClient.invalidateQueries({ queryKey: ["word-story-cards"] });
                        }}
                    />
                </div>
            ),
        },
    ];

    // Expanded row renderer - shows quizzes, materials, and assessments
    const renderSubComponent = (row: any) => {
        const card = row.original as IWordStoryCard;
        const quizzes = card.quizzes || [];
        const materials = card.materials || [];
        const assessments = card.assessments || [];
        const hasQuizzes = quizzes.length > 0;
        const hasMaterials = materials.length > 0;
        const hasAssessments = assessments.length > 0;

        if (!hasQuizzes && !hasMaterials && !hasAssessments) return null;

        
        return (
            <div className=" rounded-lg border bg-muted/30 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="border-b bg-muted/50 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-lg font-semibold">Card Details</h4>
                            <p className="text-sm text-muted-foreground">
                                {card.title} - Created {format(new Date(card.createdAt), "PPP")}
                            </p>
                        </div>
                        <Badge variant="outline" className="text-sm">
                            {card.status}
                        </Badge>
                    </div>
                </div>

                {/* Dialog Content */}
                <div className="border-b bg-white p-4">
                    <label className="text-xs font-medium text-muted-foreground uppercase">Dialog Questions</label>
                    <div className="mt-2 space-y-2">
                        <div className="text-sm p-2 bg-slate-50 rounded">
                            <span className="font-medium">Q1:</span> {card.dialogContent.dialog1}
                        </div>
                        <div className="text-sm p-2 bg-slate-50 rounded">
                            <span className="font-medium">Q2:</span> {card.dialogContent.dialog2}
                        </div>
                        <div className="text-sm p-2 bg-slate-50 rounded">
                            <span className="font-medium">Q3:</span> {card.dialogContent.dialog3}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {/* Quizzes Section */}
                 {hasQuizzes && (
                        <div className="border rounded-lg overflow-hidden bg-white flex flex-col h-full">
                            <div className="bg-slate-50 px-4 py-2 border-b flex-shrink-0">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold flex items-center gap-2">
                                            <Award className="h-4 w-4" />
                                            Quizzes
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                            {quizzes.length} quiz(es) for this story
                                        </p>
                                    </div>
                                    <Badge variant="secondary">{quizzes.length}</Badge>
                                </div>
                            </div>
                            <div className="space-y-3 p-4 flex-1 overflow-y-auto max-h-100">
                                {quizzes.map((quiz: IQuiz) => (
                                    <div key={quiz.id} className="rounded-lg border p-3 bg-white">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge variant="outline">{quiz.type}</Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                        {quiz.points} points
                                                    </span>
                                                </div>
                                                <p className="font-medium">{quiz.question}</p>
                                                {quiz.options && (
                                                    <div className="mt-2 space-y-1">
                                                        {Object.entries(quiz.options).map(([key, value]) => (
                                                            <div key={key} className="text-sm flex items-center gap-2">
                                                                <span className="font-medium">{key}:</span>
                                                                <span>{String(value)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                
                                                {/* Show Answer Button */}
                                                <div className="mt-3">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => toggleQuizAnswer(quiz.id)}
                                                        className="text-xs h-7"
                                                    >
                                                        {showQuizAnswers[quiz.id] ? 'Hide Answer' : 'Show Answer'}
                                                    </Button>
                                                    
                                                    {showQuizAnswers[quiz.id] && (
                                                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                                                            <span className="text-xs font-semibold text-green-700">Correct Answer: </span>
                                                            <span className="text-xs text-green-700">
                                                                {quiz.correctAnswer}: {quiz.options?.[quiz.correctAnswer]}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                {/* Materials Section */}
                {hasMaterials && (
                    <div className="border-b">
                        <div className="bg-slate-50 px-4 py-2 border-b">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        Learning Materials
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        {materials.length} material(s) for this story
                                    </p>
                                </div>
                                <Badge variant="secondary">{materials.length}</Badge>
                            </div>
                        </div>
                        <div className="space-y-3 px-4 py-4">
                            {materials.map((material: IMaterial) => (
                                <div key={material.id} className="rounded-lg border p-3 bg-white">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="outline">{material.type}</Badge>
                                                <h5 className="font-medium">{material.title}</h5>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{material.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Assessments Section */}
               {hasAssessments && (
                        <div className="border rounded-lg overflow-hidden bg-white flex flex-col h-full">
                            <div className="bg-slate-50 px-4 py-2 border-b flex-shrink-0">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold flex items-center gap-2">
                                            <BookOpen className="h-4 w-4" />
                                            Assessments
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                            {assessments.length} assessment(s) for this story
                                        </p>
                                    </div>
                                    <Badge variant="secondary">{assessments.length}</Badge>
                                </div>
                            </div>
                            <div className="space-y-4 p-4 flex-1 overflow-y-auto max-h-100">
                                {assessments.map((assessment: IAssessment) => (
                                    <div key={assessment.id} className="rounded-lg border p-3 bg-white">
                                        <div className="mb-3">
                                            <div className="flex items-center justify-between">
                                                <h5 className="font-semibold">{assessment.title}</h5>
                                                <Badge variant="outline">Pass: {assessment.passingScore}%</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">{assessment.description}</p>
                                        </div>
                                        <div className="space-y-2">
                                            {assessment.questions.map((q, idx) => (
                                                <div key={idx} className="text-sm p-2 bg-slate-50 rounded">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <span className="font-medium">Q{idx + 1}:</span> {q.question}
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => toggleAssessmentAnswer(assessment.id, idx)}
                                                            className="text-xs h-6 px-2 ml-2"
                                                        >
                                                            {showAssessmentAnswers[`${assessment.id}-${idx}`] ? 'Hide' : 'Show'}
                                                        </Button>
                                                    </div>
                                                    
                                                    {showAssessmentAnswers[`${assessment.id}-${idx}`] && (
                                                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                                                            <span className="text-xs font-semibold text-green-700">Answer: </span>
                                                            <span className="text-xs text-green-700">{String(q.answer)}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        
                                        {/* Show All Answers Button */}
                                        {assessment.questions.length > 0 && (
                                            <div className="mt-3">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toggleAllAssessmentAnswers(assessment.id, assessment.questions.length)}
                                                    className="text-xs h-7 w-full"
                                                >
                                                    {assessment.questions.every((_, idx) => showAssessmentAnswers[`${assessment.id}-${idx}`])
                                                        ? 'Hide All Answers'
                                                        : 'Show All Answers'}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Word Story Cards</h2>
                    <p className="text-muted-foreground">Manage all word story cards and their content</p>
                </div>

                <Link href="/dashboard/word-story-cards/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Word Story Card
                    </Button>
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={data}
                isLoading={isLoading}
                searchColumn="title"
                searchPlaceholder="Search by title..."
                renderSubComponent={renderSubComponent}
                enableExpand={enableExpand}
            />
        </div>
    );
}