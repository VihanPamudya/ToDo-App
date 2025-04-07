export interface TaskDTO {
    id?: number;
    title: string;
    description?: string | null;
    completed?: boolean;
    createdAt?: Date;
}