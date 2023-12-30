import axios from "axios";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Listing } from "@prisma/client";
async function getData(): Promise<Listing[]> {
  try {
    const result = await axios.get<Listing[]>(
      "http://localhost:3000/api/listings"
    );
    return result.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
