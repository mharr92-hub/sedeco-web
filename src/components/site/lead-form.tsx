"use client";

import { useActionState, useState } from "react";
import {
  submitLead,
  type SubmitLeadResult,
} from "@/app/actions/submit-lead";
import { tipoProyectoValues } from "@/lib/validations/lead";
import { cn } from "@/lib/utils";
import { INSPECTION_SLA, SITE_EMAIL } from "@/lib/site";

const tipoOptions = [
  { value: "", label: "Seleccionar (opcional)" },
  { value: "residencial", label: "Residencial / PH" },
  { value: "comercial", label: "Comercial / oficina" },
  { value: "hospitalario", label: "Hospitalario" },
  { value: "industrial", label: "Industrial" },
  { value: "religioso", label: "Religioso" },
  { value: "otro", label: "Otro" },
] satisfies ReadonlyArray<{
  value: "" | (typeof tipoProyectoValues)[number];
  label: string;
}>;

export function LeadForm() {
  const [resetKey, setResetKey] = useState(0);
  return (
    <LeadFormInner
      key={resetKey}
      onReset={() => setResetKey((k) => k + 1)}
    />
  );
}

function LeadFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, isPending] = useActionState<
    SubmitLeadResult | undefined,
    FormData
  >(submitLead, undefined);

  if (state?.ok) {
    return (
      <div className="rounded-lg border border-success/30 bg-white p-8">
        <h3 className="font-display text-2xl text-navy-900">
          Recibimos tu solicitud.
        </h3>
        <p className="mt-3 text-ink-600 leading-relaxed">
          {state.emailQueued
            ? `Enviamos la notificación a Mark. ${INSPECTION_SLA}`
            : `Quedó registrada. ${INSPECTION_SLA} Si necesita atención inmediata, escríbanos a ${SITE_EMAIL} o por WhatsApp.`}
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex items-center text-sm font-medium text-accent-600 transition-colors hover:text-accent-700"
        >
          Enviar otra solicitud →
        </button>
      </div>
    );
  }

  const fieldErrors = !state?.ok ? state?.fields : undefined;
  const generalError =
    state && !state.ok && !state.fields ? state.error : undefined;

  return (
    <form action={formAction} className="grid gap-5" noValidate>
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Empresa
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>
      <Field
        label="Nombre completo"
        name="nombre"
        autoComplete="name"
        required
        error={fieldErrors?.nombre}
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          error={fieldErrors?.email}
        />
        <Field
          label="Teléfono / WhatsApp"
          name="telefono"
          type="tel"
          autoComplete="tel"
          placeholder="+507 6000-0000"
          required
          error={fieldErrors?.telefono}
        />
      </div>
      <SelectField
        label="Tipo de proyecto"
        name="tipoProyecto"
        options={tipoOptions}
        error={fieldErrors?.tipoProyecto}
      />
      <TextareaField
        label="Cuéntanos del proyecto"
        name="mensaje"
        placeholder="Ej: filtración en azotea de PH de 12 pisos en Marbella, aprox. 800 m² afectados."
        required
        rows={5}
        error={fieldErrors?.mensaje}
      />
      {generalError && (
        <p className="rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          {generalError}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center rounded-md bg-accent-500 px-6 py-3 text-white font-medium transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Enviando..." : "Solicitar inspección"}
        </button>
        <p className="text-xs text-ink-400">
          {INSPECTION_SLA}
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "tel";
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
};

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
  error,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-ink-700"
      >
        {label}
        {required && <span className="ml-0.5 text-accent-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          "w-full rounded-md border bg-white px-4 py-2.5 text-ink-900 placeholder:text-ink-400 transition-shadow focus:outline-none focus:ring-2 focus:ring-accent-500/30",
          error
            ? "border-danger focus:border-danger"
            : "border-ink-200 focus:border-accent-500",
        )}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  error,
}: {
  label: string;
  name: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-ink-700"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          "w-full rounded-md border bg-white px-4 py-2.5 text-ink-900 transition-shadow focus:outline-none focus:ring-2 focus:ring-accent-500/30",
          error
            ? "border-danger focus:border-danger"
            : "border-ink-200 focus:border-accent-500",
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function TextareaField({
  label,
  name,
  required,
  rows = 4,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-ink-700"
      >
        {label}
        {required && <span className="ml-0.5 text-accent-600">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          "w-full resize-y rounded-md border bg-white px-4 py-2.5 text-ink-900 placeholder:text-ink-400 transition-shadow focus:outline-none focus:ring-2 focus:ring-accent-500/30",
          error
            ? "border-danger focus:border-danger"
            : "border-ink-200 focus:border-accent-500",
        )}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
