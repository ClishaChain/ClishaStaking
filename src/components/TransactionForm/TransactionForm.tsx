import s from "./TransactionForm.module.scss";
import { Formik } from "formik";
import { Form, Field as Input } from "formik";
import { yupSchema } from "../../helpers/yupSchema";
import { useAppContext } from "../../context/context";
import { parseEther } from "viem";
import { FC, ChangeEvent } from "react";
import { TransactionFormProps } from "../../constants/types";

// disable change input value on scroll for input type number
document.addEventListener("wheel", function () {
  const e = document.activeElement as HTMLInputElement;
  if ("blur" in e && "type" in e) {
    e.blur();
  }
});

export const TransactionForm: FC<TransactionFormProps> = ({
  handleSubmit,
  balance,
}) => {
  const context = useAppContext();
  const { schema } = yupSchema(balance);

  return (
    <Formik
      initialValues={{ amount: "" }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        const { amount } = values;

        handleSubmit(amount);
        context?.setInputValue("0");
        actions.resetForm();
      }}
    >
      {({ touched, errors }) => {
        const warningStyles = () => {
          return touched.amount && errors.amount ? s.input_warning : "";
        };
        return (
          <Form
            id="form"
            className={s.form}
            onChange={(e: ChangeEvent<HTMLFormElement>) => {
              context?.setInputValue(String(parseEther(e.target.value)));
            }}
          >
            <Input
              className={s.form_input + " " + warningStyles()}
              type="text"
              name="amount"
              placeholder="Enter stake amount"
              autoComplete="off"
            />
            <div className={s.form_error_box}>
              {touched.amount && errors.amount && (
                <p className={s.form_error}>{errors.amount}</p>
              )}
            </div>
            <p className={s.form_available}>
              Available:{" "}
              <span className={s.form_available_value}>
                {balance ? balance : "0"}{" "}
              </span>
              <span> CLISHA</span>
            </p>
          </Form>
        );
      }}
    </Formik>
  );
};
