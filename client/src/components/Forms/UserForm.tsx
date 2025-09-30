// UserForm.jsx

// UserForm.jsx import style from "./css/UserForm.module.css"; import { Modal } from "../Modal/Modal"; import { motion } from "motion/react";
// TODO: Importa React y los hooks necesarios
// TODO: Crea un componente UserForm que reciba una prop onCreate
// - Debe tener estados locales para name, email y city
// - city puede iniciar con un valor por defecto (ejemplo: "Monterrey")
// TODO: Implementa una función submit
// - Prevenir el comportamiento por defecto del formulario
// - Llamar a onCreate pasando los valores de los estados
// - Limpiar los campos después de crear
// TODO: Retorna un formulario con:
// - Input para nombre (requerido)
// - Input para email (requerido, tipo email)
// - Input para ciudad
// - Botón de submit

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import style from "./css/UserForm.module.css";
import { Modal } from "../Modal/Modal";
import { motion } from "motion/react";
import { UserSchema, type UserFormData } from "../../schemas";

/**
 * A modal-based form component for creating new users with validation, animations,
 * and drag-to-close functionality. Features real-time validation using Valibot schemas
 * and React Hook Form for state management.
 *
 * @param {UserFormProps} props - The component props
 * @param {() => void} props.closeModal - Callback function invoked when the modal should close
 * @param {(data: UserFormData) => void | Promise<void>} props.onCreate - Async handler called with validated form data on submission
 * @param {Partial<UserFormData>} [props.initialData] - Optional initial values to pre-populate the form fields
 * @param {boolean} [props.isLoading=false] - Loading state that disables form interactions and shows loading UI
 *
 * @returns {JSX.Element} The rendered UserForm component with modal container and animated form
 */

interface UserFormProps {
  closeModal: () => void;
  onCreate: (data: UserFormData) => void | Promise<void>;
  initialData?: Partial<UserFormData>;
  isLoading?: boolean;
}

export const UserForm = ({
  closeModal,
  onCreate,
  initialData,
  isLoading = false,
}: UserFormProps) => {
  /**
   * React Hook Form configuration with Valibot validation resolver.
   * Manages form state, validation, and submission handling.
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
    setFocus,
  } = useForm<UserFormData>({
    resolver: valibotResolver(UserSchema),
    mode: "onChange",
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      city: initialData?.city || "Monterrey",
    },
  });

  /**
   * Sets focus to the name input field when the component mounts.
   * Improves accessibility and user experience by immediately focusing the first field.
   */
  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  /**
   * Handles form submission with validation and error handling.
   * Prevents default form behavior, calls the onCreate callback with validated data,
   * resets the form, and closes the modal on success.
   *
   * @param {UserFormData} data - The validated form data from React Hook Form
   * @returns {Promise<void>}
   */
  const onSubmit = async (data: UserFormData) => {
    try {
      await onCreate(data);
      reset();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  /**
   * Handles modal cancellation with confirmation for unsaved changes.
   * Shows a browser confirmation dialog if the form has unsaved changes (isDirty).
   * If user confirms or form is clean, closes the modal.
   */
  const handleCancel = () => {
    if (
      isDirty &&
      !confirm("You have unsaved changes. Are you sure you want to cancel?")
    ) {
      return;
    }
    closeModal();
  };

  return (
    <Modal>
      <motion.div
        className={style.userForm__Container}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_e, info) => {
          if (info.offset.x > -100) {
            handleCancel();
          }
        }}
      >
        <div className={style.userForm__Header}>
          <h2 className={style.userForm__Title}>Create New User</h2>
          <button
            className={style.userForm__CloseButton}
            onClick={handleCancel}
            type="button"
            disabled={isSubmitting || isLoading}
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={style.userForm}
          noValidate
        >
          {/* Name Field */}
          <div className={style.formGroup}>
            <label htmlFor="name" className={style.formLabel}>
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`${style.formInput} ${
                errors.name ? style.formInputError : ""
              }`}
              placeholder="Enter user name"
              disabled={isSubmitting || isLoading}
              {...register("name")}
            />
            {errors.name && (
              <span className={style.formError}>{errors.name.message}</span>
            )}
          </div>

          {/* Email Field */}
          <div className={style.formGroup}>
            <label htmlFor="email" className={style.formLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`${style.formInput} ${
                errors.email ? style.formInputError : ""
              }`}
              placeholder="Enter email address"
              disabled={isSubmitting || isLoading}
              {...register("email")}
            />
            {errors.email && (
              <span className={style.formError}>{errors.email.message}</span>
            )}
          </div>

          {/* City Field */}
          <div className={style.formGroup}>
            <label htmlFor="city" className={style.formLabel}>
              City
            </label>
            <input
              type="text"
              id="city"
              className={`${style.formInput} ${
                errors.city ? style.formInputError : ""
              }`}
              placeholder="Enter city (default: Monterrey)"
              disabled={isSubmitting || isLoading}
              {...register("city")}
            />
            {errors.city && (
              <span className={style.formError}>{errors.city.message}</span>
            )}
          </div>

          {/* Form Actions */}
          <div className={style.formActions}>
            <button
              type="button"
              onClick={handleCancel}
              className={`${style.formButton} ${style.formButtonSecondary}`}
              disabled={isSubmitting || isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${style.formButton} ${style.formButtonPrimary}`}
              disabled={isSubmitting || isLoading || !isValid}
            >
              {isSubmitting || isLoading ? (
                <span className={style.loadingText}>Creating...</span>
              ) : (
                "Create User"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </Modal>
  );
};
