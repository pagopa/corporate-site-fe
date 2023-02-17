import { useTranslation } from 'gatsby-plugin-react-i18next/dist';

type LocalizedNode = { readonly locale: string | null };

// This hook is used to filter out nodes that are not in the current locale.
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

  const nodes = query[type].nodes;
  const localeNodes: QueryResult[] | undefined = nodes?.filter(node => node.locale === language);

  return { localeNodes };
};

