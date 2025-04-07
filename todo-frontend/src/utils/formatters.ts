export const formatDescription = (text: string, maxLength: number = 75) => {
    if (!text) return '';

    const result = [];
    for (let i = 0; i < text.length; i += maxLength) {
        result.push(text.substring(i, i + maxLength));
    }
    return result.join('\n');
};