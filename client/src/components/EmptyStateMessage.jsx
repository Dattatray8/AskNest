function EmptyStateMessage({
  icon = "💬",
  title = "No data found",
  subtitle = "There is no data to display yet.",
}) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">{icon}</div>
      <p className="text-gray-700 font-semibold text-lg mb-2">{title}</p>
      {subtitle && (
        <p className="text-gray-500 text-sm max-w-xs mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

export default EmptyStateMessage;
