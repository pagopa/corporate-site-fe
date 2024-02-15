export const previewText = (maxLength: number, fullText?: string) => {
  const markups = [
    { markup: '&nbsp;', replacement: '\n' },
    { markup: '&lt;', replacement: '<' },
    { markup: '&gt;', replacement: '>' },
    { markup: '&amp;', replacement: '&' },
    { markup: '&quot;', replacement: '"' },
    { markup: '&apos;', replacement: "'" },
    { markup: '&cent;', replacement: '¢' },
    { markup: '&pound;', replacement: '£' },
    { markup: '&yen;', replacement: '¥' },
    { markup: '&euro;', replacement: '€' },
    { markup: '&copy;', replacement: '©' },
    { markup: '&reg;', replacement: '®' },
  ];

  const cleanText = fullText?.replace(
    /(&nbsp;)|(&lt;)|(&gt;)|(&amp;)|(&quot;)|(&apos;)|(&cent;)|(&pound;)|(&yen;)|(&euro;)|(&copy;)|(&reg;)|(<([^>]+)>)/gi,
    (_match, markup) => {
      const matchedMarkup = markups.find(obj => obj.markup === markup);
      return matchedMarkup ? matchedMarkup.replacement : '';
    }
  );

  const previewText = cleanText
    ?.split(' ')
    .splice(0, maxLength)
    .join(' ')
    .concat('...');

  return previewText;
};
