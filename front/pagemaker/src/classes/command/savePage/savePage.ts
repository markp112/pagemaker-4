import { PageService } from '@/services/page/page.service';
import type { Command } from '../model/command';
import type { Page } from '@/components/page/model/pageElement/pageElement';

export class SavePageCommand implements Command {

  constructor(private page: Page, private service = PageService) {}

  execute(): void {
    this.service().upadatePage(this.page);
  }
  undo() {
    throw new Error('not implemented');
  }
}