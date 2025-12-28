export const getUserInitials = (name?: string): string => {
  if (!name || name.trim().length === 0) {
    return '?';
  }
  return name[0].toUpperCase();
};


export const getAvatarProps = (
  profilePictureUrl?: string,
  userName?: string,
  defaultBgColor: string = '#666'
): {
  bgColor: string;
  imageUrl?: string;
  displayText?: string;
} => {
  if (profilePictureUrl) {
    return {
      bgColor: defaultBgColor,
      imageUrl: profilePictureUrl,
      displayText: undefined
    };
  }

  return {
    bgColor: defaultBgColor,
    imageUrl: undefined,
    displayText: getUserInitials(userName)
  };
};
