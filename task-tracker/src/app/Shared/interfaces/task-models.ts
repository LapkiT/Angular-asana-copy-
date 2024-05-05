export interface Task {
    id: string;
    title: string;
    deadline: Date;
    priority: Priority;
    status: Status;
    assignees: string[];
  }
  
  export enum Priority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low'
  }
  
  export enum Status {
    ToDo = 'ToDo',
    InProgress = 'InProgress',
    Done = 'Done'
  }
  