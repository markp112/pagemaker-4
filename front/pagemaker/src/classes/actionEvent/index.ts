
type ActionEventTypes = "Navigation";

interface ActionEvent {
  actionType: ActionEventTypes;
  eventAction: string;
}

class AnActionEvent implements ActionEvent {
  private _actionType: ActionEventTypes = 'Navigation';
  private _eventAction: string;

  constructor(actionType: ActionEventTypes, eventAction: string) {
    this._actionType = actionType;
    this._eventAction = eventAction;
  }

  get actionType(): ActionEventTypes {
    return this._actionType;
  }

  get eventAction(): string {
    return this._eventAction;
  }

  public get toObject(): ActionEvent {
    return {
      actionType: this._actionType,
      eventAction: this._eventAction
    };
  }
}

export { AnActionEvent };
