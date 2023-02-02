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

  const localeNodes: QueryResult[] | undefined = query[type].nodes?.filter(
    node => node.locale === language
  );

  return { localeNodes };
};
