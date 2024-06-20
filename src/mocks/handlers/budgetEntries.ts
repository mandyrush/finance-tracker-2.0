import { http, HttpResponse } from "msw";
import { budgetEntries } from "@/mocks/data/budgetEntries";

const allEntries = new Map(budgetEntries);

export const handlers = [
  http.get("/budget-entries", () => {
    return HttpResponse.json(Array.from(allEntries.values()));
  }),
  http.post("/budget-entries", async ({ request }) => {
    const entryData = await request.json();
    const id = Math.floor(Math.random() * 1000);
    const newEntry = { ...entryData, id };
    allEntries.set(id, newEntry);
    return HttpResponse.json(newEntry, { status: 201 });
  }),
  http.delete("/budget-entries/:id", ({ params }) => {
    // All request path params are provided in the "params"
    // argument of the response resolver.
    const { id } = params;
    const deletedEntry = allEntries.get(id);

    if (!deletedEntry) {
      return new HttpResponse(null, { status: 404 });
    }

    allEntries.delete(id);
    return HttpResponse.json(deletedEntry);
  }),
];
