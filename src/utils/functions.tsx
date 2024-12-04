export const generateRandomColor = (): string => {
  const ionicColors = [
    'primary',
    'secondary',
    'tertiary',
    'success',
    'warning',
    'danger',
    'light',
    'medium',
    'dark',
  ];
  const randomIndex = Math.floor(Math.random() * ionicColors.length);
  return ionicColors[randomIndex];
};
