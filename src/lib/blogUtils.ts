export const generateSlug = (title: string): string => {
  const turkishMap: { [key: string]: string } = {
    'ç': 'c',
    'ğ': 'g',
    'ı': 'i',
    'İ': 'i',
    'ö': 'o',
    'ş': 's',
    'ü': 'u',
    'Ç': 'c',
    'Ğ': 'g',
    'Ö': 'o',
    'Ş': 's',
    'Ü': 'u',
  };

  return title
    .toLowerCase()
    .split('')
    .map((char) => turkishMap[char] || char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
