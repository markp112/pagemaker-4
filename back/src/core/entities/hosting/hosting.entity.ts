interface VersionEntity {
  name: string;
  status: string;
  config: object;
  version?: string;
};

interface PopulateResponseEntity {
  uploadRequiredHashes: string[],
  uploadUrl: string,
};

type User = {
  email: string
};

interface FinaliseResponseEntity  {
  name: string;
  status: string;
  config: {
    headers: [{
      glob: string;
      headers: {
        'Cache-Control': string;
      }
    }]
  },
  createTime: string;
  createUser: User;
  finalizeTime: string;
  finaliseUser: User;
  fileCount: string;
  versionBytes: string;
};

interface ReleaseResponseEntity  {
  name: string;
  version: {
      name: string;
      status: string;
      config: {
      headers: [{
        glob: string;
        headers: { "Cache-Control": string };
      }]
    }
  };
  type: string;
  releaseTime: string;
};

interface FilenameAndShaEntity {
  fileName: string,
  sha256: string,
};

interface PopulateFileEntity {
  siteId: string,
  versionId: string,
  filesToPopulate: FilenameAndShaEntity[],
}

interface PopulateFilesResponseEntity {
  files: Object;
};

interface UploadEntity extends FilenameAndShaEntity {
  uploadUrl: string;
}


export {
  VersionEntity,
  PopulateResponseEntity,
  FinaliseResponseEntity,
  ReleaseResponseEntity,
  PopulateFileEntity,
  FilenameAndShaEntity,
  PopulateFilesResponseEntity,
  UploadEntity,

};