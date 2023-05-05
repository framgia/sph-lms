const fileTypes = {
  Folder: ['FOLDER'],
  File: ['DOCS', 'PPT', 'PDF'],
  Link: ['LINK'],
  Picture: ['PNG', 'JPG'],
  Video: ['YOUTUBE']
};

export function getYouTubeEmbedLink (url: string): string {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp) ?? '';

  return `https://www.youtube.com/embed/${match[7]}`;
}

export function getFileType (type: string): string {
  for (const [key, value] of Object.entries(fileTypes)) {
    if (value.includes(type.toUpperCase())) {
      return key;
    }
  }
  return 'File';
}
