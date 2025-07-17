export const sanitizeContent = (content) =>
    content.replaceAll('<div><br></div>', '\n')
        .replace(/ +/g, ' ')
        .replaceAll('<div>', '\n')
        .replaceAll('</div>', '')
        .replaceAll('<br>', '')