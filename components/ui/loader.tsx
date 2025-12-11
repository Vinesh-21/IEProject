export function Loader({
  size = "md",
}: {
  size?: "sm" | "md" | "lg" | number;
}) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
  };

  const className = typeof size === "number" ? undefined : sizeMap[size];

  return (
    <div className="flex justify-center items-center py-10">
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-black ${
          className || ""
        }`}
        style={typeof size === "number" ? { height: size, width: size } : {}}
      />
    </div>
  );
}
