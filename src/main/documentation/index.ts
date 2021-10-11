import paths from './paths';
import components from './components';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'PipeDrive-Bling integration API',
    description: "This is the API documentation made by Josiney Mafra as LinkApi's technical test",
    version: '1.0.0',
    contact: {
      name: 'Josiney Mafra',
      email: 'josineyjunior14@gmail.com',
    },
  },
  externalDocs: {
    description: 'Link to repository on github',
    url: 'https://github.com/JosineyJr/PipeDrive-Bling-Integration-API',
  },
  servers: [
    {
      url: '/api',
      description: 'Main server',
    },
  ],
  tags: [
    {
      name: 'Login',
      description: 'Login related API - email: admin@admin.com password: admin',
    },
    {
      name: 'Integration',
      description: 'Integration related API',
    },
  ],
  paths,
  schemas,
  components,
};
