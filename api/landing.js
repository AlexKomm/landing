/* eslint-disable import/prefer-default-export */
import axiosInstance from '../utils/axios';
import transform from '../utils/transform';
import { getSessionCookie } from '../utils/cookies';
import parseJsonApi from '../utils/deserialize';

function getBaseUrl(ctx) {
  // Добавляем к API url текущий поддомен
  const host = ctx && ctx.req ? ctx.req.headers.host : window.location.hostname;

  const extractSubdomain = hostName => {
    const hostNameArr = hostName.split('.');
    return hostNameArr.length > 2 ? hostNameArr[0] : null;
  };

  const subdomain = extractSubdomain(host);

  let baseURL = process.env.BACKEND_URL;

  if (subdomain) {
    baseURL = baseURL.replace(/(http[s]{0,1}):\/\/(.+)/, `$1://${subdomain}.$2`);
  }

  return baseURL;
}

export const getPageData = (ctx, path) => {
  return new Promise((resolve, reject) => {
    // Получаем данные страницы по ее пути
    axiosInstance
      .get(`/router/translate-path?path=${path}`, { baseURL: getBaseUrl(ctx) })
      .then(res => {
        const { jsonapi: { individual } = {} } = res.data;

        if (individual) {
          const pageFields = [
            'title',
            'field_landing_title',
            'field_landing_subtitle',
            'field_landing_image',
            'field_landing_formats',
            'field_landing_formats_title',
            'field_landing_steps_title',
            'field_landing_partners_title',
            'field_landing_foods',
            'field_landing_body',
            'field_event_occasion',
            'field_landing_format',
            'field_people_count',
          ];

          axiosInstance
            .get(individual, {
              params: {
                'fields[node--landing]': pageFields.join(','),
                'fields[taxonomy_term--event_occasion]': 'drupal_internal__tid,name',
                'fields[taxonomy_term--format]': 'drupal_internal__tid,name',
                include: 'field_event_occasion, field_landing_format',
              },
              headers: {
                'Content-Type': 'application/vnd.api+json',
                Accept: 'application/vnd.api+json',
              },
            })
            .then(pageRes => {
              const jsonApiData = parseJsonApi(pageRes.data);
              resolve(transform(jsonApiData.data));
            })
            .catch(pageErr => reject(pageErr));
        }
      })
      .catch(err => reject(err));
  });
};

export const getDomainInfo = ctx => {
  return new Promise((resolve, reject) => {
    const rpcData = {
      jsonrpc: '2.0',
      method: 'domain',
      id: 'domain',
    };

    return axiosInstance
      .get(process.env.JSONRPC_PREFIX, {
        params: {
          query: JSON.stringify(rpcData),
        },
        baseURL: getBaseUrl(ctx),
      })
      .then(res => resolve(res.data.result))
      .catch(err => reject(err));
  });
};

export const getPublicOccasions = ctx => {
  return new Promise((resolve, reject) => {
    return axiosInstance
      .get('/api/event_occasion/public', { baseURL: getBaseUrl(ctx) })
      .then(res => {
        const { data = [] } = res;
        resolve(Array.isArray(data) ? data : []);
      })
      .catch(err => reject(err));
  });
};

export const getCurrentUser = ctx => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(process.env.JSONAPI_PREFIX, {
        baseURL: getBaseUrl(ctx),
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
          Cookie: getSessionCookie(ctx),
        },
      })
      .then(res => {
        const { meta: { links: { me: { href } = {} } = {} } = {} } = res.data;

        if (!href) {
          resolve(null);
        }

        axiosInstance
          .get(href, {
            params: {
              'fields[user_role--user_role]': 'drupal_internal__id',
              'fields[user--user]': 'drupal_internal__uid,field_name,roles,field_user_image',
              'fields[file--file]': 'uri',
              include: 'roles,field_user_image',
            },
            baseURL: getBaseUrl(ctx),
            headers: {
              'Content-Type': 'application/vnd.api+json',
              Accept: 'application/vnd.api+json',
            },
          })
          .then(userRes => {
            const jsonApiData = parseJsonApi(userRes.data);
            resolve(transform(jsonApiData.data));
          })
          .catch(userErr => reject(userErr));
      })
      .catch(err => reject(err));
  });
};

export const getNav = (ctx, type) => {
  return new Promise((resolve, reject) => {
    const navbarRequestData = {
      jsonrpc: '2.0',
      method: 'cm_menu_links',
      params: {
        type,
      },
      id: 'cm_menu_links',
    };

    return axiosInstance
      .get(process.env.JSONRPC_PREFIX, {
        baseURL: getBaseUrl(ctx),
        params: {
          query: JSON.stringify(navbarRequestData),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      })
      .then(res => {
        const {
          data: { result },
        } = res;

        resolve(result);
      })
      .catch(err => reject(err));
  });
};

export const getSaleOffers = (ctx, values = {}) => {
  const { city, occasion, person, format, menuPreference } = values;

  const path = `/api/views/offers_sale/${city || 'all'}/${person || 'all'}/${format ||
    'all'}/${menuPreference || 'all'}/${occasion || 'all'}`;

  return new Promise((resolve, reject) => {
    return axiosInstance
      .get(path, {
        baseURL: getBaseUrl(ctx),
      })
      .then(response => {
        const { data } = response;
        resolve(Array.isArray(data) ? data : []);
      })
      .catch(error => reject(error));
  });
};

export const getPage = ctx => {
  let { query: { path } = {} } = ctx || {};

  if (!path) {
    path = window.location.pathname;
  }

  if (path.indexOf('/') !== 0) {
    path = `/${path}`;
  }

  return new Promise((resolve, reject) => {
    Promise.all([
      getPageData(ctx, path),
      getDomainInfo(ctx),
      getCurrentUser(ctx),
      getPublicOccasions(ctx),
      getNav(ctx, 'footer'),
      getNav(ctx, 'main'),
      getSaleOffers(ctx),
    ])
      .then(values => {
        const [page, domain, currentUser, publicOccasions, navTree, mainNav, saleOffers] = values;

        resolve({
          page,
          statusCode: 200,
          domain,
          publicOccasions,
          currentUser,
          navTree,
          mainNav,
          saleOffers,
        });
      })
      .catch(err => reject(err));
  });
};

export const getLocations = (locationType = null) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/api/event_locations/landing/${locationType || ''}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(res => {
        const { status, data = [] } = res;

        resolve({ status, data: Array.isArray(data) ? data : [] });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getTopPartners = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/api/top_partners_logos`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(res => {
        const { status, data = [] } = res;

        resolve({ status, data: Array.isArray(data) ? data : [] });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getSaleOfferOccasions = () => {
  return new Promise((resolve, reject) => {
    return axiosInstance
      .get(
        `${
          process.env.JSONAPI_PREFIX
        }/taxonomy_term/event_occasion?filter[field_is_sale_offer]=1&fields[taxonomy_term--event_occasion]=drupal_internal__tid,name`,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            Accept: 'application/vnd.api+json',
          },
        },
      )
      .then(res => {
        const jsonApiData = parseJsonApi(res.data);
        resolve(transform(jsonApiData.data));
      })
      .catch(err => reject(err));
  });
};

export const getFormats = () => {
  return new Promise((resolve, reject) => {
    return axiosInstance
      .get(
        `${
          process.env.JSONAPI_PREFIX
        }/taxonomy_term/format?fields[taxonomy_term--format]=drupal_internal__tid,name`,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            Accept: 'application/vnd.api+json',
          },
        },
      )
      .then(res => {
        const jsonApiData = parseJsonApi(res.data);
        resolve(transform(jsonApiData.data));
      })
      .catch(err => reject(err));
  });
};

export const getMenuPreferences = () => {
  return new Promise((resolve, reject) => {
    return axiosInstance
      .get(
        `${
          process.env.JSONAPI_PREFIX
        }/taxonomy_term/menu_preferences?fields[taxonomy_term--menu_preferences]=drupal_internal__tid,name`,
        {
          headers: {
            'Content-Type': 'application/vnd.api+json',
            Accept: 'application/vnd.api+json',
          },
        },
      )
      .then(res => {
        const jsonApiData = parseJsonApi(res.data);
        resolve(transform(jsonApiData.data));
      })
      .catch(err => reject(err));
  });
};

export const getTaxonomy = () => {
  return new Promise((resolve, reject) => {
    Promise.all([getSaleOfferOccasions(), getFormats(), getMenuPreferences()])
      .then(values => {
        const [occasions, formats, menuPreferences] = values;

        resolve({ occasions, formats, menuPreferences });
      })
      .catch(err => reject(err));
  });
};

export const getFeedbacks = (occasion = null, format = null) => {
  return new Promise((resolve, reject) => {
    let path = '/api/feedback_all/';

    if (occasion) {
      path += `${occasion}/`;
    }

    if (format) {
      path += `${format}/`;
    }

    return axiosInstance
      .get(path)
      .then(res => {
        const { status, data = [] } = res;
        resolve({ status, data: Array.isArray(data) ? data : [] });
      })
      .catch(err => reject(err));
  });
};
