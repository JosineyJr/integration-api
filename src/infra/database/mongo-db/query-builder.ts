export class QueryBuilder {
  private query: any[] = [];

  private addStep(step: string, data: unknown): QueryBuilder {
    this.query.push({ [step]: data });

    return this;
  }

  match(data: unknown): QueryBuilder {
    return this.addStep('$match', data);
  }

  group(data: unknown): QueryBuilder {
    return this.addStep('$group', data);
  }

  sort(data: unknown): QueryBuilder {
    return this.addStep('$sort', data);
  }

  unwind(data: unknown): QueryBuilder {
    return this.addStep('$unwind', data);
  }

  lookup(data: unknown): QueryBuilder {
    return this.addStep('$lookup', data);
  }

  project(data: unknown): QueryBuilder {
    return this.addStep('$project', data);
  }

  build(): unknown[] {
    return this.query;
  }
}
