export function capitalizeWords(str) {
    return str
        .split(' ') // Split the string into an array of words
        .map(word => {
            if (word.length > 0) {
                return word[0].toUpperCase() + word.slice(1).toLowerCase(); // Capitalize the first letter and lowercase the rest
            } else {
                return word;
            }
        })
        .join(' '); // Join the array of words back into a single string
}

export function filterNotificationOnlyManual(notifications) {
  return notifications.filter((item) => !item.imageFile);
}