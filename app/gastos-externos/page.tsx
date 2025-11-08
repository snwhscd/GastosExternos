"use client";

import GastosExternosForm from "@/components/GastosExternosForm/GastosExternosForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActionCell } from "./GastosExternosTable/ActionCell";
import { columns, GastoExterno } from "./GastosExternosTable/columns";
import { DataTable } from "./GastosExternosTable/data-table";
import { Row } from "@tanstack/react-table";

async function getData(): Promise<GastoExterno[]> {
  const baseURL = process.env.NEXT_BASE_URL || "http://localhost:3000";

  try {
    const resultado = await axios.get(`${baseURL}/api/gastos-externos`);
    return resultado.data;
  } catch {
    return [];
  }
}

export default function GastosExternosPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<GastoExterno[]>([]);

  // Función centralizada para refrescar la tabla
  const refreshData = async () => {
    const newData = await getData();
    setData(newData);
    setOpen(false);
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      await refreshData();
    };
    loadData();
  }, []);

  const enhancedColumns = columns.map((col) =>
    col.id === "actions"
      ? {
          ...col,
          cell: ({ row }: { row: Row<GastoExterno>}) => (
            <ActionCell gasto={row.original} refreshData={refreshData} />
          ),
        }
      : col
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-5 dark:bg-neutral-800 p-4">
      <div className="flex justify-between items-center w-full max-w-360 mx-auto px-4">
        <h1 className="text-3xl font-bold">Gastos Externos</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <form>
            <DialogTrigger asChild>
              <Button className="cursor-pointer">+ Agregar gasto</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[620px]">
              <DialogHeader>
                <DialogTitle>Agregar Gasto Externo</DialogTitle>
                <DialogDescription>
                  Registra un nuevo Gasto Externo.
                </DialogDescription>
              </DialogHeader>

              <GastosExternosForm onSuccess={refreshData} />
            </DialogContent>
          </form>
        </Dialog>
      </div>

      <div className="w-full max-w-360  mx-auto px-4">
        <DataTable columns={enhancedColumns} data={data} />
      </div>
    </div>
  );
}
