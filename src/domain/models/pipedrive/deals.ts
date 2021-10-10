export type Status = 'open' | 'won' | 'deleted' | 'lost';

export type DealsModel = {
  title: string;
  value?: string;
  currency?: string;
  user_id?: number;
  person_id?: number;
  org_id: number;
  stage_id?: number;
  status?: Status;
  expected_close_date?: Date;
  probability?: number;
  lost_reason?: string;
  visible_to: 1 | 3;
  add_time?: Date;
};
