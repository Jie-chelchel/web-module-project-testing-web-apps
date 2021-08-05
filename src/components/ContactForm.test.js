import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const headerEelement = screen.getByText(/contact form/i);
  expect(headerEelement).toBeInTheDocument();
  expect(headerEelement).toBeTruthy();
  expect(headerEelement).toHaveTextContent(/contact form/i);
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const firstNameInput = await screen.findByPlaceholderText(/edd/i);
  userEvent.type(firstNameInput, "dwd");
  const errorMessage = await screen.findByTestId(/error/i);
  expect(errorMessage).toHaveTextContent(
    /firstName must have at least 5 characters./i
  );
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);

  const submitButtons = await screen.findByRole("button");
  userEvent.click(submitButtons);

  const allErrors = screen.queryAllByTestId("error");
  expect(allErrors.length).toBe(3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstNameInput = await screen.findByPlaceholderText(/edd/i);
  const lastNameInput = await screen.findByPlaceholderText(/burke/i);
  userEvent.type(firstNameInput, "adfewfwefe");
  userEvent.type(lastNameInput, "sfew");

  const submitButtons = await screen.findByRole("button");
  userEvent.click(submitButtons);
  const errorMessages = screen.queryAllByTestId("error");
  expect(errorMessages.length).toBe(1);
  expect(errorMessages[0]).toBeInTheDocument();
  expect(errorMessages[0]).toHaveTextContent(
    /email must be a valid email address./i
  );
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailInput = await screen.findByLabelText(/email/i);
  userEvent.type(emailInput, "ssssss");
  const errorMessage = await screen.findByTestId(/error/i);
  expect(errorMessage).toHaveTextContent(
    /email must be a valid email address./i
  );
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const firstNameInput = await screen.findByPlaceholderText(/edd/i);
  const emailInput = await screen.findByLabelText(/email/i);
  userEvent.type(emailInput, "zhangjiec@gmail.com");
  userEvent.type(firstNameInput, "adfewfwefe");

  const lastNameInput = await screen.findByPlaceholderText(/burke/i);
  expect(lastNameInput.value).toBe("");
  const submitButtons = await screen.findByRole("button");
  userEvent.click(submitButtons);
  const errorMessage = await screen.findByTestId(/error/i);
  expect(errorMessage).toHaveTextContent(/ lastName is a required field/i);
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const firstNameInput = await screen.findByPlaceholderText(/edd/i);
  const lastNameInput = await screen.findByPlaceholderText(/burke/i);
  const emailInput = await screen.findByLabelText(/email/i);
  const messageInput = await screen.findByLabelText(/message/i);

  userEvent.type(firstNameInput, "adfewfwefe");
  userEvent.type(lastNameInput, "sfew");
  userEvent.type(emailInput, "zhangjiec@gmail.com");
  const submitButtons = await screen.findByRole("button");
  userEvent.click(submitButtons);
  expect(messageInput.value).not.toBeTruthy();
  expect(firstNameInput).toBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstNameInput = await screen.findByPlaceholderText(/edd/i);
  const lastNameInput = await screen.findByPlaceholderText(/burke/i);
  const emailInput = await screen.findByLabelText(/email/i);
  const messageInput = await screen.findByLabelText(/message/i);

  userEvent.type(firstNameInput, "adfewfwefe");
  userEvent.type(lastNameInput, "sfew");
  userEvent.type(emailInput, "zhangjiec@gmail.com");
  userEvent.type(messageInput, "hahahahahaah");
  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(messageInput).toBeInTheDocument();
});
