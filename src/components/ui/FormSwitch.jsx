import { Controller } from "react-hook-form";
import { Form, Stack } from "react-bootstrap";
import styles from './FormSwitch.module.css';

function FormSwitch({
  name,
  control,
  label = "Ativo",
  reverse = true,
  trueLabel = "Sim",  // Label para o switch quando ativo
  falseLabel = "Não"  // Label para o switch quando inativo
}) {
  return (
    <Stack className={styles.vstack}>
      <Form.Label className={styles.form_label}  htmlFor={name}>{label}</Form.Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Form.Check
            type="switch"
            id={name}
            className={styles.form_check}
            label={field.value ? trueLabel : falseLabel}
            reverse={reverse}
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
          />
        )}
      />
    </Stack>
  );
}

export default FormSwitch;
