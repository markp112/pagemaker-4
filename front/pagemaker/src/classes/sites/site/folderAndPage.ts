type FileType = 'html' | 'css' | 'js';

interface FolderAndPage {
  pageName: string,
  filename: string,
  type: FileType,
  pathToFile: string,
  resolvedPathToFile: string
  fileContent: string,
  isZipped: boolean,
  sha256: string,
}

export type { FolderAndPage, FileType };
