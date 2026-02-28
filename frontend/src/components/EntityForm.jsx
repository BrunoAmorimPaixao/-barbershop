import Field from "./Field";
import SelectField from "./SelectField";

function EntityForm({ fields, values, onChange, buttonLabel, onSubmit }) {
  return (
    <form className="entity-form" onSubmit={onSubmit}>
      {fields.map((field) => {
        if (field.type === "textarea") {
          return (
            <Field
              key={field.name}
              label={field.label}
              name={field.name}
              type="textarea"
              value={values[field.name]}
              onChange={onChange}
            />
          );
        }

        if (field.type === "select") {
          return (
            <SelectField
              key={field.name}
              label={field.label}
              name={field.name}
              value={values[field.name]}
              options={field.options}
              onChange={onChange}
            />
          );
        }

        return (
          <Field
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            step={field.step}
            value={values[field.name]}
            onChange={onChange}
          />
        );
      })}
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}

export default EntityForm;
