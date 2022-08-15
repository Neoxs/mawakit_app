import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import App from "./App";
import mockAxios from "./mocks/mockAxios";

jest.mock("axios");

test("renders without errors", () => {
  render(<App />);
  expect(screen.getByRole("logo")).toHaveTextContent(/Mawakit/);
  expect(screen.getByRole("no_result_illustration")).toBeInTheDocument();
  expect(screen.getByTestId("country-input")).toBeInTheDocument();
  expect(screen.getByTestId("date-input")).toBeInTheDocument();
  expect(screen.getByTestId("btn")).toBeInTheDocument();
});

test("get data successfully", async () => {
  // The expexted result
  const res = {
    results: {
      sunrise: "5:32:52 AM",
      sunset: "7:11:52 PM",
      solar_noon: "12:22:22 PM",
      day_length: "13:39:00",
      civil_twilight_begin: "5:06:41 AM",
      civil_twilight_end: "7:38:02 PM",
      nautical_twilight_begin: "4:33:30 AM",
      nautical_twilight_end: "8:11:13 PM",
      astronomical_twilight_begin: "3:58:27 AM",
      astronomical_twilight_end: "8:46:16 PM",
    },
    status: "OK",
  };

  // Casting the Axios function as a mock
  (axios.get as jest.Mock).mockResolvedValueOnce(res);

  // Calling the api
  const result = await axios.get("https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=2022-08-14");

  // Verify if the call was done
  expect(axios.get).toHaveBeenCalledWith("https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=2022-08-14")

  // Comparing the results
  expect(result).toEqual(res);
});
