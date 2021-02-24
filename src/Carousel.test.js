import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it('renders without crashing', () => {
  render (<Carousel />);
});

it("matches the snapshot", () => {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the arrows are clicked", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  const leftArrow = queryByTestId("left-arrow")
  fireEvent.click(leftArrow)

  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
});

it("left arrow hidden on first image & right arrow hidden on last image", function() {
  const {queryByTestId} = render(<Carousel />);

  expect(queryByTestId("left-arrow")).toHaveClass('hidden');
  expect(queryByTestId("right-arrow")).not.toHaveClass('hidden');

  // move forward in the carousel the number of images
  const rightArrow = queryByTestId("right-arrow");
  for (let i =0; i<2; i++) {
    fireEvent.click(rightArrow);
  }
  
  expect(queryByTestId("left-arrow")).not.toHaveClass('hidden');
  expect(rightArrow).toHaveClass('hidden');

});
