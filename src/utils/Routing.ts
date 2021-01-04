enum ROUTE {
  HOME = '/',
  COMICS = '/comics/:page',
  COMIC = '/comic/:id',
  CHARACTERS = '/characters/:page',
  CHARACTER = '/character/:id',
  STORIES = '/stories/:page',
  STORIE = '/storie/:id',
  BOOKMARKS = '/bookmarks',
  ERROR = '*',
}

type TArgs =
  | { path: string; params: { id?: number | string; page?: number | string } }
  | { path: ROUTE.HOME }
  | { path: ROUTE.COMICS; params: { page: number | string } }
  | { path: ROUTE.CHARACTERS; params: { page: number | string } }
  | { path: ROUTE.STORIES; params: { page: number | string } }
  | { path: ROUTE.COMIC; params: { id: number | string } }
  | { path: ROUTE.CHARACTER; params: { id: number | string } }
  | { path: ROUTE.STORIE; params: { id: number | string } }
  | { path: ROUTE.BOOKMARKS }
  | { path: ROUTE.ERROR };

type TArgsWithParams = Extract<TArgs, { path: any; params: any }>;

const createPath = (args: TArgs) => {
  if (Object.prototype.hasOwnProperty.call(args, 'params') === false) return args.path;

  return Object.entries((args as TArgsWithParams).params).reduce(
    (previousValue: string, [param, value]) => previousValue.replace(`:${param}`, `${value}`),
    args.path
  );
};

export { createPath, ROUTE };
