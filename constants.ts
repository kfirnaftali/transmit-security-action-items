
import { ActionItem, Priority, Status } from './types';

export const ACTION_ITEMS: ActionItem[] = [
    {
        id: 1,
        priority: Priority.HIGH,
        description: 'Investigate and plan the transition away from Config Connector, exploring Flex Templates and CI/CD tools.',
        owner: '',
        status: Status.NOT_STARTED,
        notes: ''
    },
    {
        id: 2,
        priority: Priority.HIGH,
        description: 'Begin the gradual rollout of the new Short-Term Aggregation (STA) service.',
        owner: '',
        status: Status.NOT_STARTED,
        notes: ''
    },
    {
        id: 3,
        priority: Priority.HIGH,
        description: 'Upgrade the Python version in Dataflow jobs from 3.8 to a more recent version.',
        owner: '',
        status: Status.NOT_STARTED,
        notes: ''
    },
    {
        id: 4,
        priority: Priority.HIGH,
        description: 'Follow up on the support case for the broken data freshness metric.',
        owner: '',
        status: Status.NOT_STARTED,
        notes: ''
    },
    {
        id: 5,
        priority: Priority.MEDIUM,
        description: 'Optimize worker image size to reduce startup times.',
        owner: '',
        status: Status.NOT_STARTED,
        notes: ''
    },
    {
        id: 6,
        priority: Priority.MEDIUM,
        description: 'Implement a configurable parameter for "late data allowance" in pipelines.',
        owner: '',
        status: Status.NOT_STARTED,
        notes: ''
    },
    {
        id: 7,
        priority: Priority.LOW,
        description: 'Share the proposed STA architecture with relevant teams for brainstorming.',
        owner: '',
        status: Status.NOT_STARTED,
        notes: ''
    }
];

export const STATUS_OPTIONS: Status[] = Object.values(Status);
export const PRIORITY_OPTIONS: Priority[] = Object.values(Priority);
