export const formatTags = (tagString: string): string => {
  // Split the input string by commas and spaces
  const tagsArray = tagString.split(/[,\s]+/);

  // Filter and format the tags
  const formattedTags = tagsArray
    .filter((tag) => tag.trim() !== '') // Remove empty tags
    .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`)); // Add '#' if missing

  return formattedTags.join(',');
};
