import { StaticQueryDocument, useStaticQuery } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next/dist';

type LocalizedNode = { readonly locale: string | null };

export const useLocalizedQuery = <
  QueryResult extends LocalizedNode,
  QueryType extends Record<string, { nodes: ReadonlyArray<QueryResult> }>
>({
  query,
  type,
}: {
  query: QueryType;
  type: keyof QueryType;
}) => {
  const {
    i18n: { language },
  } = useTranslation();

  const localeData: QueryResult | undefined = query[type].nodes?.find(
    node => node.locale === language
  );

  return { localeData };
};
