"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { gastoExternoFormSchema } from "./GastosExternosForm.form";

type GastosExternosFormProps = {
  onSuccess: () => void;
};

const GastosExternosForm = ({ onSuccess }: GastosExternosFormProps) => {
  const form = useForm<z.infer<typeof gastoExternoFormSchema>>({
    resolver: zodResolver(gastoExternoFormSchema),
    defaultValues: {
      folio: "",
      fecha: new Date(),
      rz: "",
      banco: "",
      tdc: "",
      proveedor: "",
      concepto: "",
      referencia: "",
      documento: "",
      responsable: "",
      transferencia: "",
      tipoGasto: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof gastoExternoFormSchema>) => {
    try {
      const datosToSend = {
        ...values,
        fecha: values.fecha.toISOString(),
      };

      await axios.post("/api/gastos-externos", datosToSend);

      toast.success("Gasto Externo registrado correctamente!");
      onSuccess?.();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error al crear el gasto:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      } else {
        console.error("Error inesperado:", error);
      }

      toast("Error al registrar el gasto");
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8h grid grid-cols-2 gap-5"
        >
          {/* Folio */}
          <FormField
            control={form.control}
            name="folio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Folio</FormLabel>
                <FormControl>
                  <Input placeholder="Folio..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fecha */}
          <FormField
            control={form.control}
            name="fecha"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      className="bg-white dark:bg-background rounded-md border shadow"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Razón social */}
          <FormField
            control={form.control}
            name="rz"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Razón Social</FormLabel>
                <FormControl>
                  <Input placeholder="Razón social..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* banco */}
          <FormField
            control={form.control}
            name="banco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banco</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: BBVA, Banorte, etc..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* tdc */}
          <FormField
            control={form.control}
            name="tdc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TDC</FormLabel>
                <FormControl>
                  <Input placeholder="TDC..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* proveedor */}
          <FormField
            control={form.control}
            name="proveedor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proveedor</FormLabel>
                <FormControl>
                  <Input placeholder="Proveedor..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* concepto */}
          <FormField
            control={form.control}
            name="concepto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Concepto</FormLabel>
                <FormControl>
                  <Input placeholder="Concepto..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* referencia */}
          <FormField
            control={form.control}
            name="referencia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referencia</FormLabel>
                <FormControl>
                  <Input placeholder="Referencia..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* documento */}
          <FormField
            control={form.control}
            name="documento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documento</FormLabel>
                <FormControl>
                  <Input placeholder="Documento..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* responsable */}
          <FormField
            control={form.control}
            name="responsable"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsable</FormLabel>
                <FormControl>
                  <Input placeholder="Responsable..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* transferencia */}
          <FormField
            control={form.control}
            name="transferencia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transferencia</FormLabel>
                <FormControl>
                  <Input placeholder="Transferencia..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Folio */}
          <FormField
            control={form.control}
            name="tipoGasto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo Gasto</FormLabel>
                <FormControl>
                  <Input placeholder="Tipo Gasto..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="cursor-pointer">Registrar Gasto</Button>
        </form>
      </Form>
    </div>
  );
};

export default GastosExternosForm;
