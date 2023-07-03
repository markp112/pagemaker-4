type FirebaseHeader = {
  glob: string;
  headers: [{
    key: string;
    value: string
  }]
};

type FirebaseHostingDao = {
  site: {
    siteConfig: {
      domain: string;
      headers: [ FirebaseHeader ];
    }
  }
};

type FirebaseHostingResponse = {
  name: string;
  defaultUrl: string;
  type: string;
};

export type { FirebaseHostingDao, FirebaseHeader, FirebaseHostingResponse };
