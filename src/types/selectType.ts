export type SelectOption = {
  label: string;
  value: string | number;
};

export type SelectProps = {
  /**
   * Custom CSS classes for the select component
   */
  customClasses?: string;

  /**
   * Custom inline styles for the select component
   */
  customStyles?: string;

  /**
   * Whether the select component is disabled
   */
  disabled?: boolean;

  /**
   * The label for the select component
   */
  label?: string;

  /**
   * Whether the select component is required
   */
  required?: boolean;

  /**
   * The options for the select component
   */
  options: SelectOption[];

  /**
   * The currently selected option
   */
  selectedOption?: string | number;

  /**
   * A function to set the selected option
   */
  setSelectedOption?: (option: string | number) => void;
};
