export default function LabelledInput({
  label,
  inputWidget,
}: {
  label: string;
  inputWidget: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-[6px]">
      <p className="text-[14px] text-gray-800">{label}</p>
      {inputWidget}
    </div>
  );
}
