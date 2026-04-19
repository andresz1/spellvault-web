export const paths = {
  pricing: {
    en: "/pricing",
    es: "/precios",
  },
  tutorials: {
    en: "/tutorials",
    es: "/tutoriales",
  },
} as Record<string, Record<string, string>>;

export const ta = (
  key: string,
  variables: { [name: string]: string | number | null | undefined } = {},
) => {
  const values = paths[key];

  return Object.entries(values).reduce(
    (acc, [locale, path]) => {
      return {
        ...acc,
        [locale]: Object.keys(variables).reduce((path, key) => {
          return path.replace(`:${key}`, variables[key]?.toString() || "");
        }, path),
      };
    },
    {} as Record<string, string>,
  );
};

export const tp = (
  key: string,
  locale: string,
  variables: { [name: string]: string | number | null | undefined } = {},
) => {
  const values = paths[key];
  const path = values && values[locale];

  if (!path) {
    return key;
  }

  return Object.keys(variables).reduce((path, key) => {
    return path.replace(`:${key}`, variables[key]?.toString() || "");
  }, path);
};
