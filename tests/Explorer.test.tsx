import { render, waitFor } from "@solidjs/testing-library";
import { Explorer } from "../src/Explorer";
import '@solidjs/testing-library';
import '@testing-library/jest-dom'

const props = {
  name: "Hi",
  obj: {},
  key: "123"
};

const { findByTestId } = render(() => undefined);

beforeEach(() => {
  render(() => <Explorer name={props.name} obj={props.obj} key={props.key} />);
})

it("component displays correct name", () => {
  const header = findByTestId('name-head');
  waitFor(() => expect(header).toContain('Hi'));
})

it("ocdiv contains something...", () => {
  const OCD = findByTestId('ocdiv');
  waitFor(() => expect(OCD).not.toBeEmptyDOMElement)
});

it("renders an object component", () => {
  const OC = findByTestId('oc');
  waitFor(() => expect(OC).toBeInTheDocument)
});