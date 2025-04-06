import ReactSelect from "react-select";

export default function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select…",
  multiple = false,
}) {
  const getSingleValue = () => options.find((opt) => opt.value === value);
  const getMultiValue = () => options.filter((opt) => value?.includes(opt.value));

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
      "&:hover": { borderColor: "#3b82f6" },
      fontSize: "0.875rem",
    }),
    singleValue: (base) => ({ ...base, color: "#000" }),
    multiValueLabel: (base) => ({ ...base, color: "#000" }),
    input: (base) => ({ ...base, color: "#000" }),
    placeholder: (base) => ({ ...base, color: "#6b7280" }),
    menu: (base) => ({ ...base, zIndex: 100 }),
    menuList: (base) => ({ ...base, backgroundColor: "white" }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? "#e5e7eb"
        : isFocused
        ? "#f3f4f6"
        : "white",
      color: "#000",
      "&:active": { backgroundColor: "#e5e7eb" },
    }),
  };

  return (
    <div className="flex flex-col space-y-1 mb-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <ReactSelect
        isMulti={multiple}
        value={multiple ? getMultiValue() : getSingleValue()}
        onChange={(selected) => {
          if (multiple) {
            onChange(selected.map((s) => s.value));
          } else {
            onChange(selected ? selected.value : "");
          }
        }}
        options={options}
        placeholder={placeholder}
        styles={customStyles}
        className="text-sm"
        classNamePrefix="react-select"
      />
    </div>
  );
}
