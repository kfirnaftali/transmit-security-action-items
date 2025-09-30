
export enum Priority {
    HIGH = 'High',
    MEDIUM = 'Medium',
    LOW = 'Low'
}

export enum Status {
    NOT_STARTED = 'Not Started',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
    BLOCKED = 'Blocked'
}

export interface ActionItem {
    id: number;
    priority: Priority;
    description: string;
    owner: string;
    status: Status;
    notes: string;
}
