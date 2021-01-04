enum APIType {
  CHARACTERS = 'characters',
  COMICS = 'comics',
  CREATORS = 'creators',
  EVENTS = 'events',
  SERIES = 'series',
  STORIES = 'stories',
}

export enum Format {
  COMIC = 'comic',
  MAGAZINE = 'magazine',
  TRADE_PAPERBACK = 'trade paperback',
  HARDCOVER = 'hardcover',
  DIGEST = 'digest',
  GRAPHIC_NOVEL = 'graphic novel',
  DIGITAL_COMIC = 'digital comic',
  INFINITE_COMIC = 'infinite comic',
}

export enum orderBy {
  FOC_DATE = 'focDate',
  ON_SALE_DATE = 'onsaleDate',
  TITLE = 'title',
  NAME = 'name',
  ISSUE_NUMBER = 'issueNumber',
  ID = 'id',
  MODIFIED = 'modified',
  DESC_ID = '-id',
  DESC_FOC_DATE = '-focDate',
  DESC_ON_SALE_DATE = '-onsaleDate',
  DESC_TITLE = '-title',
  DESC_NAME = '-name',
  DESC_ISSUE_NUMBER = '-issueNumber',
  DESC_MODIFIED = '-modified',
}

export interface urlParams {
  title?: string;
  format?: string;
  id?: number;
  offset?: number;
  limit?: number;
  dateRange?: string;
  orderBy?: string;
  name?: string;
  modifiedSince?: string;
  comics?: string;
  series?: string;
  stories?: string;
}

interface urlCreatorTypes {
  (endpoint: string, params?: urlParams, filter?: APIType): string;
}

const paramsWrapper = (params: urlParams): string => {
  const apiParams: Array<string> = [];
  let returningString = '';

  if (params.title) {
    apiParams.push(`title=${params.title}`);
  }

  if (params.name) {
    apiParams.push(`name=${params.name}`);
  }

  if (params.format) {
    apiParams.push(`format=${params.format}`);
  }

  if (params.dateRange) {
    apiParams.push(`dateRange=${params.dateRange}`);
  }

  if (params.modifiedSince) {
    apiParams.push(`modifiedSince=${params.modifiedSince}`);
  }

  if (params.limit) {
    apiParams.push(`limit=${params.limit}`);
  }

  if (params.orderBy) {
    apiParams.push(`orderBy=${params.orderBy}`);
  }

  if (params.offset) {
    apiParams.push(`offset=${params.offset}`);
  }

  if (params.stories) {
    apiParams.push(`stories=${params.stories}`);
  }

  if (params.comics) {
    apiParams.push(`comics=${params.comics}`);
  }

  if (apiParams.length > 0) {
    returningString = apiParams.join('&');
  }

  return returningString;
};

const urlCreator: urlCreatorTypes = (endpoint, params, filter) => {
  let returningURL: string = `${process.env.REACT_APP_API_VERSION as string}/public/${endpoint}`;

  if (params) {
    if (params?.id) {
      returningURL += `/${params.id}?`;
      if (filter) {
        returningURL += filter;
      }
    } else {
      returningURL += `?${paramsWrapper(params)}`;
    }
  } else {
    returningURL += '?';
  }
  return returningURL;
};

export default {
  CHARACTERS(params?: urlParams) {
    return urlCreator(APIType.CHARACTERS, params);
  },
  CHARACTER_COMICS(params?: urlParams) {
    return urlCreator(APIType.CHARACTERS, params, APIType.COMICS);
  },
  CHARACTER_STORIES(params?: urlParams) {
    return urlCreator(APIType.CHARACTERS, params, APIType.STORIES);
  },
  COMICS(params?: urlParams) {
    return urlCreator(APIType.COMICS, params);
  },
  COMICS_STORIES(params?: urlParams) {
    return urlCreator(APIType.COMICS, params, APIType.STORIES);
  },
  COMICS_CHARACTERS(params?: urlParams) {
    return urlCreator(APIType.COMICS, params, APIType.CHARACTERS);
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
  STORIES_CHARACTERS(params?: urlParams) {
    return urlCreator(APIType.STORIES, params, APIType.CHARACTERS);
  },
  STORIES_COMICS(params?: urlParams) {
    return urlCreator(APIType.STORIES, params, APIType.COMICS);
  },
};
