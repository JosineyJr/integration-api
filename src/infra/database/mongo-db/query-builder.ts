export class QueryBuilder {
  private query: any[] = [];

  private addStep(step: string, data: any): QueryBuilder {
    this.query.push({ [step]: data });

    return this;
  }

  match(data: any): QueryBuilder {
    return this.addStep('$match', data);
  }

  group(data: any): QueryBuilder {
    return this.addStep('$group', data);
  }

  sort(data: any): QueryBuilder {
    return this.addStep('$sort', data);
  }

  unwind(data: any): QueryBuilder {
    return this.addStep('$unwind', data);
  }

  lookup(data: any): QueryBuilder {
    return this.addStep('$lookup', data);
  }

  project(data: any): QueryBuilder {
    return this.addStep('$project', data);
  }

  build(): any[] {
    return this.query;
  }
}
