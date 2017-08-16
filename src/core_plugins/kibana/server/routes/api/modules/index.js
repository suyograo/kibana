import Boom from 'boom';
import Joi from 'joi';
import { setupModule } from '../../../lib/modules/setup_module';

export function setupModuleApi(server) {
  server.route({
    path: '/api/module/setup',
    method: ['POST'],
    config: {
      validate: {
        payload: Joi.object().keys({
          name: Joi.string(),
          elasticsearch_template: Joi.string(),
          objects: Joi.array(),
          version: Joi.string()
        }),
        query: Joi.object().keys({
          force: Joi.boolean().default(false),
          exclude: [Joi.string(), Joi.array().items(Joi.string())]
        })
      },
      tags: ['api'],
    },

    handler: (req, reply) => {
      return setupModule(req)
        .then((resp) => reply(resp))
        .catch(err => reply(Boom.wrap(err, 400)));
    }
  });
}
