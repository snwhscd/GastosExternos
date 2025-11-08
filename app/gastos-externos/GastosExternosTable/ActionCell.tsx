import { GastoExterno } from "@/app/generated/prisma/client";
import EditGastosExternosForm from "@/components/EditGastosExternosForm/EditGastosExternosForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { format } from "date-fns";
import { DeleteIcon, EyeIcon, MoreHorizontal, PencilIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ActionCellProps = {
  gasto: GastoExterno;
  refreshData: () => void; // <-- Recibe la función desde la página
};

export function ActionCell({ gasto, refreshData }: ActionCellProps) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleEditSuccess = async () => {
    await refreshData(); // <-- Refresca la tabla
    setEditOpen(false); // cierra el modal de edición
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      await axios.delete(`/api/gastos-externos/${gasto.id}`);
      toast.success("Gasto eliminado correctamente");
      await refreshData();
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el gasto");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>

          <DropdownMenuItem
            className="cursor-pointer flex justify-between"
            onClick={() => setEditOpen(true)}
          >
            Editar
            <PencilIcon />
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer flex justify-between"
            onClick={() => setOpen(true)}
          >
            Ver
            <EyeIcon />
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="cursor-pointer flex justify-between text-red-600"
          >
            Eliminar
            <DeleteIcon />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal para ver el gasto externo */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Detalles del Gasto
            </DialogTitle>
            <DialogDescription>
              Consulta la información registrada de este gasto externo.
            </DialogDescription>
          </DialogHeader>

          <Card className="border shadow-sm">
            <CardContent className="grid grid-cols-2 gap-4 py-4">
              <div>
                <p className="font-bold text-sm">Folio</p>
                <p>{gasto.folio || " - "}</p>
              </div>
              <div>
                <p className="font-bold text-sm">Fecha</p>
                <p>
                  {gasto.fecha
                    ? format(new Date(gasto.fecha), "dd/MM/yyyy")
                    : " - "}
                </p>
              </div>
              <div>
                <p className="font-bold text-sm">Razón Social</p>
                <p>{gasto.rz || " - "}</p>
              </div>
              <div>
                <p className="font-bold text-sm">Banco</p>
                <p>{gasto.banco || " - "}</p>
              </div>
              <div>
                <p className="font-bold text-sm">TDC</p>
                <p>{gasto.tdc || " - "}</p>
              </div>
              <div>
                <p className="font-bold text-sm">Proveedor</p>
                <p>{gasto.proveedor || " - "}</p>
              </div>
              <div className="col-span-2">
                <p className="font-bold text-sm">Concepto</p>
                <p>{gasto.concepto || " - "}</p>
              </div>
              <div>
                <p className="font-bold text-sm">Referencia</p>
                <p>{gasto.referencia || " - "}</p>
              </div>
              <div>
                <p className="font-bold text-sm">Documento</p>
                <p>{gasto.documento || " - "}</p>
              </div>
              <div>
                <p className="font-bold text-sm">Responsable</p>
                <p>{gasto.responsable || " - "}</p>
              </div>
              <div>
                <p className="font-bold text-sm">Transferencia</p>
                <p>{gasto.transferencia || " - "}</p>
              </div>
              <div>
                <p className="font-bold text-sm">Tipo de Gasto</p>
                <p>{gasto.tipoGasto || " - "}</p>
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cerrar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para editar */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <form>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Editar Gasto Externo</DialogTitle>
              <DialogDescription>
                Haz cambios sobre el Gasto Externo seleccionado.
              </DialogDescription>
            </DialogHeader>

            <EditGastosExternosForm
              gasto={gasto}
              onSuccess={handleEditSuccess}
            />
          </DialogContent>
        </form>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este gasto externo? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="cursor-pointer"
              variant="destructive"
              onClick={handleDelete}
              disabled={loadingDelete}
            >
              {loadingDelete ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
