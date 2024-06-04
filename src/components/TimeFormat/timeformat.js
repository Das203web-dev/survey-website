import { formatDistanceToNow } from 'date-fns';

const formatRelativeTime = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date)) {
        console.error('Invalid date:', timestamp);
        return 'Invalid date';
    }
    return formatDistanceToNow(date, { addSuffix: true });
};

export default formatRelativeTime;

