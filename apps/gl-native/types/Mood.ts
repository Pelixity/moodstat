export type MoodDetail = {
    id: number;
    mood: number;
    description: string;
    color?: string;
    created_at: Date;
}

export type MoodSummary = {
    averageMood: number;
    color?: string;
}
