export default function ContextMenu({
  sections,
}: {
  sections: Array<{
    title: string;
    items: Array<{
      title: string;
      icon: string;
      onClick: () => void;
    }>;
  }>;
}) {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
      {sections.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <div className="text-lg font-bold">{section.title}</div>
          {section.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-row gap-2 items-center p-2 rounded-md bg-gray-100 hover:bg-gray-200"
              onClick={item.onClick}
            >
              <p className="text-2xl">{item.title}</p>
            </div>
          ))}
          {/* add row if is not the last*/}
          {sections.indexOf(section) !== sections.length - 1 && (
            <div className="w-full h-px bg-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
}
