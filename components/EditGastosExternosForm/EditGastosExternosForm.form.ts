import { z } from "zod";

export const gastoExternoFormSchema = z.object({
  folio: z.string().min(1, "El folio es requerido"),
  fecha: z.date({
    error: (issue) =>
      issue.input === undefined ? "La fecha es requerido" : "Fecha inválida",
  }),
  rz: z.string(),
  banco: z.string(),
  tdc: z.string(),
  proveedor: z.string(),
  concepto: z.string(),
  referencia: z.string(),
  documento: z.string(),
  responsable: z.string(),
  transferencia: z.string(),
  tipoGasto: z.string(),
});

export type GastoExternoFormValues = z.infer<typeof gastoExternoFormSchema>;
