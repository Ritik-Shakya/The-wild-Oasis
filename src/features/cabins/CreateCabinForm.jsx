import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Span = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabin = {}, onClose }) {
  const { additionCabin, isLoading } = useCreateCabin();
  const { editingCabin, isLoading: isEditing } = useEditCabin();
  const isEditSession = cabin?.name ? true : false;
  const { id: editId, ...editValues } = cabin;

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  function onSubmit(data) {
    //image has to be manipulated into desired formatpath before creating row in cabins table.
    //for bucket storage the image is fine.

    //checking wether the image is already uplaoded(then image is data.image) or image is being edited(then image : data.image[0])
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (!isEditSession) {
      additionCabin({ ...data, image: data.image[0] });
      onClose?.();
      reset();
    } else {
      editingCabin({ cabin: { ...data, image }, id: editId });
      onClose?.();
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name?.message && <Span>{errors.name.message}</Span>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>

        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register("maxCapacity", { required: "This field is required" })}
        />
        {errors?.maxCapacity?.message && (
          <Span>{errors.maxCapacity.message}</Span>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>

        <Input
          type="number"
          id="regularPrice"
          disabled={isLoading}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Price cannot be less than one." },
          })}
        />
        {errors?.regularPrice?.message && (
          <Span>{errors.regularPrice.message}</Span>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          disabled={isLoading}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount cannot be more than the regular price.",
          })}
        />
        {errors?.discount?.message && <Span>{errors.discount.message}</Span>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>

        <Textarea
          type="number"
          id="description"
          disabled={isLoading}
          {...register("description", { required: "This field is required" })}
        />
        {errors?.description?.message && (
          <Span>{errors.description.message}</Span>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
        {errors?.image?.message && <Span>{errors.image.message}</Span>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || isEditing}>
          {isEditSession ? "Edit Cabin" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
