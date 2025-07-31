import useToggle from "@/hooks/useToggle";
import { useEffect, useMemo, useState } from "react";
import { IconAngleDown, IconAngleUp } from "../Icons";

function TextSelect({ editor }) {
  const [selectedOption, setSelectedOption] = useState("Paragraph");
  const { node, toggle, setToggle } = useToggle();

  const options = useMemo(
    () => [
      {
        name: "Paragraph",
        action: () => editor?.chain().focus().setParagraph().run(),
        isActive: editor?.isActive("paragraph") || false,
      },
      {
        name: "Heading 1",
        action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: editor?.isActive("heading", { level: 1 }) || false,
      },
      {
        name: "Heading 2",
        action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: editor?.isActive("heading", { level: 2 }) || false,
      },
      {
        name: "Heading 3",
        action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: editor?.isActive("heading", { level: 3 }) || false,
      },
      {
        name: "Heading 4",
        action: () => editor?.chain().focus().toggleHeading({ level: 4 }).run(),
        isActive: editor?.isActive("heading", { level: 4 }) || false,
      },
      {
        name: "Heading 5",
        action: () => editor?.chain().focus().toggleHeading({ level: 5 }).run(),
        isActive: editor?.isActive("heading", { level: 5 }) || false,
      },
      {
        name: "Heading 6",
        action: () => editor?.chain().focus().toggleHeading({ level: 6 }).run(),
        isActive: editor?.isActive("heading", { level: 6 }) || false,
      },
    ],
    [editor]
  );

  useEffect(() => {
    if (!editor) return;

    // Update selected option based on current editor state
    if (editor.isActive("paragraph")) {
      setSelectedOption("Paragraph");
    } else if (editor.isActive("heading", { level: 1 })) {
      setSelectedOption("Heading 1");
    } else if (editor.isActive("heading", { level: 2 })) {
      setSelectedOption("Heading 2");
    } else if (editor.isActive("heading", { level: 3 })) {
      setSelectedOption("Heading 3");
    } else if (editor.isActive("heading", { level: 4 })) {
      setSelectedOption("Heading 4");
    } else if (editor.isActive("heading", { level: 5 })) {
      setSelectedOption("Heading 5");
    } else if (editor.isActive("heading", { level: 6 })) {
      setSelectedOption("Heading 6");
    }
  }, [editor, editor?.state.selection]);

  const handleOptionClick = (option) => {
    if (editor && option.action) {
      option.action();
      setSelectedOption(option.name);
      setToggle(false);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div ref={node} className="w-[130px] text-sm font-medium">
      <button
        type="button"
        className="!pl-4 !pr-2 py-2 w-full flex !justify-between rounded-md bg-white border border-gray-300"
        onClick={() => setToggle(!toggle)}
      >
        {selectedOption}
        <span>{toggle ? <IconAngleUp /> : <IconAngleDown />}</span>
      </button>

      <div className="relative">
        {toggle && (
          <div className="absolute w-full mt-1 space-y-0.5 p-0.5 border border-gray-300 bg-white z-30 rounded-md">
            {options.map((option) => (
              <button
                key={option.name}
                type="button"
                className={`w-full !pl-4 flex !justify-start py-1 ${
                  option.isActive
                    ? "bg-gray-300 hover:!bg-gray-300"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TextSelect;
