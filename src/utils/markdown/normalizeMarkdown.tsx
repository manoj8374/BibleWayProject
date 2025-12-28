const normalizeMarkdown = (text: string) => {
  return text
    // .replace(/__\s*(.*?)\s*__/g, '**$1**');
};

export default normalizeMarkdown;
