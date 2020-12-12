let scrollOffsetY = 0;

export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}) => {
  scrollOffsetY = contentOffset.y;

  const hasContent = contentSize.height > 100;
  const paddingToBottom = 100;
  const scrollDirection = scrollOffsetY > contentOffset.y ? 'UP' : 'DOWN';

  return (
    hasContent &&
    scrollDirection === 'DOWN' &&
    contentOffset.y > 0 &&
    layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  );
};

export default { isCloseToBottom };
