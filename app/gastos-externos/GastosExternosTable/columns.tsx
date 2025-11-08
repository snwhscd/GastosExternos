"use client";

import { ColumnDef } from "@tanstack/react-table";

export type GastoExterno = {
  id: number;
  folio: string;
  fecha: Date;
  rz: string;
  banco: string;
  tdc: string;
  proveedor: string;
  concepto: string;
  referencia: string;
  documento: string;
  responsable: string;
  transferencia: string;
  tipoGasto: string;
};

export const columns: ColumnDef<GastoExterno>[] = [
  {
    accessorKey: "folio",
    header: "Folio",
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }) => {
      const fechaRaw = row.getValue("fecha") as string;
      if (!fechaRaw) return "-";

      const date = new Date(fechaRaw);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
  {
    accessorKey: "rz",
    header: "Razón Social",
  },
  {
    accessorKey: "banco",
    header: "Banco",
  },
  {
    accessorKey: "tdc",
    header: "TDC",
  },
  {
    accessorKey: "proveedor",
    header: "Proveedor",
  },
  {
    accessorKey: "concepto",
    header: "Concepto",
  },
  {
    accessorKey: "referencia",
    header: "referencia",
  },
  {
    accessorKey: "documento",
    header: "Documento",
  },
  {
    accessorKey: "responsable",
    header: "Responsable",
  },
  {
    accessorKey: "transferencia",
    header: "Transferencia",
  },
  {
    accessorKey: "tipoGasto",
    header: "Tipo Gasto",
  },
  {
    accessorKey: "Acciones",
    id: "actions",
    enableHiding: false,
    // cell: ({ row }) => <ActionCell gasto={row.original} />,
  },
];
