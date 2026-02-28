import { patchState } from "../lib/forms";

function Field({ label, name, type, value, onChange, step }) {
  return (
    <label className="field">
      <span>{label}</span>
      {type === "textarea" ? (
        <textarea name={name} value={value} onChange={(event) => patchState(onChange, name, event.target.value)} />
      ) : (
        <input
          name={name}
          type={type}
          step={step}
          value={value}
          onChange={(event) => patchState(onChange, name, event.target.value)}
        />
      )}
    </label>
  );
}

export default Field;
