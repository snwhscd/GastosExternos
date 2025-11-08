import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const gastosExternos = await prisma.gastoExterno.findMany({
    orderBy: {
      fecha: "asc",
    },
  });

  return NextResponse.json(gastosExternos);
}

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();

    const data = request;

    const result = await prisma.gastoExterno.create({
      data,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in POST /api/gastos-externos:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
