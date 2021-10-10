export namespace JobsProvider {
  export namespace AddJob {
    export type Params = { data: any };
    export type Output = { data: any };
  }

  export namespace ProcessJobs {
    export type Params<T> = { concurrency: number; callback: (job: any) => T; details?: string };
    export type Output = void;
  }
}

export interface IJobsProvider {
  add: (data: JobsProvider.AddJob.Params) => Promise<JobsProvider.AddJob.Output>;

  processJobs: <T = any>(data: JobsProvider.ProcessJobs.Params<T>) => Promise<JobsProvider.ProcessJobs.Output>;
}
