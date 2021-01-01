enum APIType {
  CHARACTERS = 'characters',
  COMICS = 'comics',
  CREATORS = 'creators',
  EVENTS = 'events',
  SERIES = 'series',
  STORIES = 'stories',
}

type urlParams = {
  id?: number;
  offset?: number;
  limit?: number;
};

interface urlCreatorTypes {
  (endpoint: string, params?: urlParams): string;
}

const paramsWrapper = (params: urlParams): string => {
  const apiParams: Array<string> = [];
  let returningString = '';

  if (params.limit) {
    apiParams.push(`limit=${params.limit}`);
  }

  if (params.offset) {
    apiParams.push(`offset=${params.offset}`);
  }

  if (apiParams.length > 0) {
    returningString = apiParams.join('&');
  }

  return returningString;
};

const urlCreator: urlCreatorTypes = (endpoint, params) => {
  let returningURL: string = `${process.env.REACT_APP_API_VERSION as string}/public/${endpoint}`;
  if (params) {
    if (params?.id) {
      returningURL += `/${params.id}?`;
    } else {
      returningURL += `?${paramsWrapper(params)}`;
    }
  }
  return returningURL;
};

export default {
  CHARACTERS(params?: urlParams) {
    return urlCreator(APIType.CHARACTERS, params);
  },
  COMICS(params?: urlParams) {
    return urlCreator(APIType.COMICS, params);
  },
  CREATORS(params?: urlParams) {
    return urlCreator(APIType.CREATORS, params);
  },
  EVENTS(params?: urlParams) {
    return urlCreator(APIType.EVENTS, params);
  },
  SERIES(params?: urlParams) {
    return urlCreator(APIType.SERIES, params);
  },
  STORIES(params?: urlParams) {
    return urlCreator(APIType.STORIES, params);
  },
};
