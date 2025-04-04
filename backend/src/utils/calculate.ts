export const calculateWorkerSalary = (
  quantity: number,
  pricePerUnit: number
): number => quantity * pricePerUnit;

export const calculateWireUsageKg = (
  quantity: number,
  weightPerPiece: number
): number => quantity * weightPerPiece;

export const calculateInvoiceTotal = (
  quantity: number,
  pricePerUnit: number
): number => quantity * pricePerUnit;
