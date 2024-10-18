import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useUpdateSettings } from "./useUpdateSettings";
import styled from "styled-components";
import { useState } from "react";

const Styleddiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
  border-top: 50px;
`;

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isLoading: isUpdating, settingUpdation } = useUpdateSettings();
  const { register, handleSubmit } = useForm();

  const [change, setChange] = useState(false);

  if (isLoading) return <Spinner />;

  const {
    breakfastPrice,
    maxBookingsLength,
    maxGuestsPerBooking,
    minBookingsLength,
  } = settings;

  function onSubmit(data) {
    settingUpdation(data);
    setChange(false);
  }

  function handleChange() {
    setChange(true);
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormRow label="Minimum nights/booking">
            <Input
              type="number"
              id="min-nights"
              defaultValue={minBookingsLength}
              {...register("minBookingsLength", {
                required: "This field is required.",
              })}
              onChange={handleChange}
            />
          </FormRow>
          <FormRow label="Maximum nights/booking">
            <Input
              type="number"
              id="max-nights"
              defaultValue={maxBookingsLength}
              {...register("maxBookingsLength", {
                required: "This field is required.",
              })}
              onChange={handleChange}
            />
          </FormRow>
          <FormRow label="Maximum guests/booking">
            <Input
              type="number"
              id="max-guests"
              defaultValue={maxGuestsPerBooking}
              {...register("maxGuestsPerBooking", {
                required: "This field is required.",
              })}
              onChange={handleChange}
            />
          </FormRow>
          <FormRow label="Breakfast price">
            <Input
              type="number"
              id="breakfast-price"
              defaultValue={breakfastPrice}
              {...register("breakfastPrice", {
                required: "This field is required.",
              })}
              onChange={handleChange}
            />
          </FormRow>
        </div>
        {change && (
          <Styleddiv>
            <Button type="submit" disabled={isUpdating}>
              Update Settings
            </Button>
          </Styleddiv>
        )}
      </Form>
    </>
  );
}

export default UpdateSettingsForm;
