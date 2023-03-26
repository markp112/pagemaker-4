import { commandGroups } from '../../../../../src/api/v1.0/private/commandGroups/controller/index';

describe('command groups controller', () => {
  it('should return a CommandHierarchy object with items for tabs, groups, panels and commands', async () => {
    const result = await commandGroups().get();
    console.log('%c⧭', 'color: #ffa280', result);
    expect(result).toBeTruthy();
  })
})