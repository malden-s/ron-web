export const AdvancedInputType = {
  Amount: 0,
  MinOrder: 1,
  MaxOrder: 2,
  Earn: 3,
  EarnMin: 4
};

export const AdvancedInputSections = [
  { id: AdvancedInputType.Amount, label: "totalAmount" },
  { id: AdvancedInputType.MinOrder, label: "Min. order size" },
  { id: AdvancedInputType.MaxOrder, label: "Max. order size" },
  { id: AdvancedInputType.Earn, label: "Earn"},
  { id: AdvancedInputType.EarnMin, label: "Earn (Min. amount)" }
];
