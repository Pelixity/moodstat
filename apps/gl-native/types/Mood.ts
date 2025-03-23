export type MoodDetail = {
    id: number;
    mood: number;
    description: string;
    color?: string;
    created_at: number;
}

export type MoodSummary = {
    averageMood: number;
    color?: string;
}
