type SnackbarTypes = 
| {
  readonly type: 'success',
  message: string;
  title: string;
  readonly show: true
}
| {
  readonly type: 'error',
  message: string;
  title: string;
  readonly show: true
}
| {
  readonly type: 'info',
  message: string;
  title: string;
  readonly show: true
}
| {
  readonly type: 'warning',
  message: string;
  title: string;
  readonly show: true
}
| {
  readonly type: 'hidden',
  message: string;
  title: string;
  readonly show: false
};

type SnackbarActions = 
|
  {
    type: 'success' | 'warning' | 'error' | 'info',
    payload: {
      message: string,
      title: string,
    }
  }
|
  {
    type: 'hidden',
  };

export type { SnackbarTypes, SnackbarActions };
