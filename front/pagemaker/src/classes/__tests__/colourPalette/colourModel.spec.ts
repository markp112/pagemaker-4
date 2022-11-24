import { describe, it, expect, beforeEach } from "vitest";
import { AColourModel, analagous, ColourModelFactory, complementary, compound, triadic } from '../../colourPalette/colourModels';


describe('AColourModel', () => {
  it('should when the constructor is called set the secondary and accent angles with the input values', () => {
    const secondary = 120;
    const accent = 60;
    const colourModel = new AColourModel(secondary, accent);
    expect(colourModel.secondary).equal(secondary);
    expect(colourModel.accent).equal(accent);
  });
});

describe('ColourModelFatory', () => {
  let colourModelFactory: ColourModelFactory;

  beforeEach(() => {
    colourModelFactory = new ColourModelFactory()
  })
  it('should return a Colour Model class configured according to the requested Supported Colour Model', () => {
    it('should when getColourModel is called with analagous return a AColourModel configured as Analagous', () => {
      const colourModel = colourModelFactory.getColourModel('analogous');
      expect(colourModel.accent).toBe(analagous.accent);
      expect(colourModel.secondary).toBe(analagous.secondary);
    });
    it('should when getColourModel is called with compund return a AColourModel configured as compound', () => {
      const colourModel = colourModelFactory.getColourModel('compound');
      expect(colourModel.accent).toBe(compound.accent);
      expect(colourModel.secondary).toBe(compound.secondary);
    });
    it('should when getColourModel is called with triadic return a AColourModel configured as triadic', () => {
      const colourModel = colourModelFactory.getColourModel('triadic');
      expect(colourModel.accent).toBe(triadic.accent);
      expect(colourModel.secondary).toBe(triadic.secondary);
    });
    it('should when getColourModel is called with complementary return a AColourModel configured as Complementary', () => {
      const colourModel = colourModelFactory.getColourModel('complementary');
      expect(colourModel.accent).toBe(complementary.accent);
      expect(colourModel.secondary).toBe(complementary.secondary);
    });

  })
})
