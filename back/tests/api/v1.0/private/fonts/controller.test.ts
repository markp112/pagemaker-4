import { fontsController } from '../../../../../src/api/v1.0/private/fonts/controller/';

describe('fontsController', () => {
  it('should call the google font api and return the list of all fonts', async () => {
    const fonts = await fontsController().getGoogleFonts();
    expect(fonts).toBeTruthy();
  })
})


