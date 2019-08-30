const getImagePath = (preset, field) => {
  const {
    uri: { url: defaultPath } = {},
    links: { [preset]: { href: presetUrl = null } = {} } = {},
  } = field || {};

  let photo = presetUrl;

  if (!photo && defaultPath) {
    photo = `${process.env.BACKEND_URL}${field.uri.url}`;
  }

  return photo;
};

const transforms = {
  'node--landing': data => {
    const { attributes } = data;

    const formats = data.fieldLandingFormats.map(format => {
      const [title, description, budget, person, image] = format.split('|');

      return { title, description, budget, person, image: `/static/formats/${image}` };
    });

    const foods = data.fieldLandingFoods.map(food => {
      const [image, title] = food.split('|');
      return { image: `/static/foods/${image}`, title };
    });

    const { processed: body = null } = data.fieldLandingBody || {};

    return {
      id: data.id,
      title: attributes.title,
      body,
      heroTitle: attributes.field_landing_title[0].value,
      heroSubtitle: attributes.field_landing_subtitle[0].value,
      heroImage: attributes.field_landing_image[0],
      formats,
      formatsTitle: data.fieldLandingFormatsTitle,
      stepsTitle: data.fieldLandingStepsTitle.value,
      partnersTitle: data.fieldlandingPartnersTitle ? data.fieldlandingPartnersTitle.value : null,
      foods,
      domain: data.fieldDomainSource,
      defaultPersonCount: data.fieldPeopleCount,
      defaultOccasion: data.fieldEventOccasion
        ? transforms['taxonomy_term--event_occasion'](data.fieldEventOccasion)
        : null,
      defaultFormat: data.fieldLandingFormat
        ? transforms['taxonomy_term--format'](data.fieldLandingFormat)
        : null,
    };
  },
  'taxonomy_term--menu_preferences': data => {
    const { attributes } = data;

    return {
      uuid: data.id,
      tid: attributes.drupal_internal__tid,
      name: attributes.name,
    };
  },
  'taxonomy_term--format': data => {
    if (!data) {
      return null;
    }
    return {
      uuid: data.id,
      tid: data.drupalInternalTid,
      name: data.name,
    };
  },
  'taxonomy_term--event_occasion': data => {
    if (!data) {
      return null;
    }

    return {
      uuid: data.id,
      tid: data.drupalInternalTid,
      name: data.name,
    };
  },
  'node--offer': data => {
    return {
      uuid: data.id,
      nid: data.drupalInternalNid,
      title: data.title,
      price: parseInt(data.fieldOfferTotal, 10),
      rating: parseFloat(data.uid.fieldRating),
      feedbackCount: 25, // TODO пока не поддерживается на бэкенде
      photo: getImagePath('offer_sale_small_ret', data.fieldOfferPhoto),
    };
  },
  'user--user': data => {
    const { alias: path } = data.path || {};

    let roles = [];

    if (data.roles) {
      roles = data.roles.map(role => role.drupalInternalId);
    }

    return {
      uuid: data.id,
      uid: data.drupalInternalUid,
      name: data.fieldName,
      rating: data.fieldRating,
      path: path || `/user/${data.drupalInternalUid}`,
      image: getImagePath('user_photo', data.fieldUserImage),
      roles,
    };
  },
};

const transform = data => {
  if (transforms[data.type]) {
    return transforms[data.type](data);
  }

  return data;
};

export default transform;
