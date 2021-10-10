import Bull, { Job, Queue } from 'bull';
import { IJobsProvider, JobsProvider } from '../jobs-provider';

export class BullJobsAdapter implements IJobsProvider {
  private readonly jobs: Queue;

  constructor(readonly name: string) {
    this.jobs = new Bull(this.name, { redis: { port: 6379, host: '127.0.0.1' }, limiter: { max: 1, duration: 3000 } });
    this.jobs.on('completed', (job: Job, result: any) => {
      console.log(`job ${job.id} completed with result`, result);
    });
  }

  async add({ data }: JobsProvider.AddJob.Params): Promise<JobsProvider.AddJob.Output> {
    const result = await this.jobs.add(data);

    return result;
  }

  async processJobs<T>({
    concurrency,
    callback,
    details,
  }: JobsProvider.ProcessJobs.Params<T>): Promise<JobsProvider.ProcessJobs.Output> {
    try {
      await this.jobs.process(concurrency, (job: Job) => {
        console.log(`job ${job.id}`);
        console.log(details);

        return callback(job.data);
      });
    } catch (error) {
      console.log('handler already defined');
    }
  }
}
