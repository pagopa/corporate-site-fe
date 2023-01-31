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
  query: StaticQueryDocument;
  type: keyof QueryType;
}) => {
  const {
    i18n: { language },
  } = useTranslation();

  const queryResult: QueryType = useStaticQuery(query);

  const localeData: QueryResult | undefined = queryResult[type].nodes?.find(
    node => node.locale === language
  );

  return { localeData };
};
