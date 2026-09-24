import assert from "node:assert/strict";
import test from "node:test";
import { adsLeadFormSchema } from "./lead";

const filtracionesLead = {
  nombre: "Ana Pérez",
  telefono: "65508320",
  problema: "filtracion",
  tipoPropiedad: "ph",
  ubicacion: "San Francisco",
  puedeEnviarFotos: "si",
  landingPath: "/filtraciones",
  source: "ads_filtraciones",
};

test("filtraciones lead stays valid without servicio", () => {
  const parsed = adsLeadFormSchema.safeParse(filtracionesLead);
  assert.equal(parsed.success, true);
  if (parsed.success) assert.equal(parsed.data.servicio, undefined);
});

test("empty servicio does not fail older forms", () => {
  const parsed = adsLeadFormSchema.safeParse({
    ...filtracionesLead,
    servicio: "",
  });
  assert.equal(parsed.success, true);
  if (parsed.success) assert.equal(parsed.data.servicio, undefined);
});

test("integral lead keeps the servicio slug", () => {
  const parsed = adsLeadFormSchema.safeParse({
    ...filtracionesLead,
    problema: "fachada",
    landingPath: "/fachadas",
    source: "web_fachadas",
    servicio: "fachadas",
  });
  assert.equal(parsed.success, true);
  if (parsed.success) assert.equal(parsed.data.servicio, "fachadas");
});

test("rejects a servicio outside the catalog", () => {
  const parsed = adsLeadFormSchema.safeParse({
    ...filtracionesLead,
    servicio: "empleo",
  });
  assert.equal(parsed.success, false);
});
