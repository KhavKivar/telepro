import key from "@lucide/astro/icons/key";

export default function Pagination({
  selected,
  total,
  onClick,
}: {
  selected: number;
  total: number;
  onClick: (index: number) => void;
}) {
  const dots = Array.from({ length: total }, (_, i) => i);

  return (
    <div className="flex justify-center items-center gap-2">
      {dots.map((index: number) => (
        <button
          key={index}
          type="button"
          onClick={() => onClick(index)}
          className={`h-1 rounded-full transition-all duration-300 ${
            selected === index
              ? "w-10 bg-blue-600"
              : "w-6 bg-gray-300 hover:bg-gray-400"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
