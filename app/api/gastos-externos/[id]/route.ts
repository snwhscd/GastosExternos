import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const dataReq = await request.json();
    const data = {
      ...dataReq,
      fecha: new Date(dataReq.fecha),
    };

    console.log(data)

    const updatedGastoExterno = await prisma.gastoExterno.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json(updatedGastoExterno);
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar el gasto" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });

    await prisma.gastoExterno.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Gasto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al eliminar el gasto" }, { status: 500 });
  }
}