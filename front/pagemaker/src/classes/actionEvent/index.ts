
type ActionEventTypes = 'Navigation' | 'none';

interface ActionEvent {
  actionType: ActionEventTypes;
  eventAction: string;
};

export type { ActionEvent, ActionEventTypes };
