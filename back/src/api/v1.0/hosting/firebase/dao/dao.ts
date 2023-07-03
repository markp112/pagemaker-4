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
  status: string;
  config: {
    headers: {
      glob: string;
      headers: {
        'Cache-Control': string;
      };
    }[]
  }
}
export type { FirebaseHostingDao, FirebaseHeader, FirebaseHostingResponse };
