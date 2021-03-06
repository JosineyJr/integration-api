import { Controller } from '@/application/controllers';

export const adaptRoute = (controller: Controller) => {
  return async (req: any, res: any) => {
    const request = {
      ...(req.body || {}),
      ...(req.user || {}),
      ...(req.params || {}),
    };

    const httpResponse = await controller.handle(request);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message, statusCode: httpResponse.statusCode });
    }
  };
};
