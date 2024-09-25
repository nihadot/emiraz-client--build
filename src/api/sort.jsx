export const ascendingSortFunction = (arr) => {
    arr.sort((a, b) => {
        const numA = parseInt(a.priority);
        const numB = parseInt(b.priority);

        
        // Sort by priority if available, otherwise by date
        if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB || new Date(b.date) - new Date(a.date); // Sort by priority, then by date descending
        } else if (!isNaN(numA)) {
            return -1; // 'a' has priority but 'b' doesn't
        } else if (!isNaN(numB)) {
            return 1; // 'b' has priority but 'a' doesn't
        } else {
            return new Date(b.date) - new Date(a.date); // Neither has priority, sort by date descending
        }
    });
    return arr; // Return the sorted array
};