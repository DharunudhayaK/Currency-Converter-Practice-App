import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";

function App() {
  const [countryList, setCountryList] = useState({});
  const [countryFromTo, setCountryFromTo] = useState({
    from: "",
    to: "",
    amount: "",
  });
  const [valid, setValid] = useState(false);
  const [result, setResult] = useState("");
  const [loader, setLoader] = useState(false);

  async function fetchCountry() {
    try {
      const response = await fetch("https://api.frankfurter.app/currencies");
      const jsonData = await response.json();
      return jsonData;
    } catch (err) {
      return err;
    }
  }

  useEffect(() => {
    setCountryList((prev) => ({
      ...prev,
      obj: {},
      err: "",
    }));
    fetchCountry()
      .then((response) => {
        setCountryList((prev) => ({
          ...prev,
          obj: { ...response },
          err: "",
        }));
        setCountryFromTo({
          from: Object.keys({ ...response })?.[0],
          to: Object.keys({ ...response })?.[1],
        });
      })
      .catch((err) => {
        setCountryList((prev) => ({
          ...prev,
          obj: {},
          err: err?.message ?? "Unknown Error",
        }));
      });
  }, []);

  const onChange = (e) => {
    const { value, name } = e.target;
    setCountryFromTo((prev) => {
      const config = {
        ...prev,
        [name]: value,
      };
      return { ...config };
    });
    if (name === "amount") {
      const numRegex = Boolean(value >= 0);
      setValid(numRegex);
    }
  };

  async function fetchAfterConvertion(from, to) {
    setLoader((prev) => !prev);
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?base=${from}&symbols=${to}`
      );
      const jsonData = await response.json();
      return jsonData;
    } catch (err) {
      return err;
    }
  }

  const onConvert = async (data) => {
    const { from, to, amount } = data;
    if (Boolean(amount)) {
      fetchAfterConvertion(from, to)
        .then((res) => {
          setLoader((prev) => !prev);
          const convertedAmount = parseInt(amount) * res.rates[to].toFixed(2);
          setResult(convertedAmount);
        })
        .catch((err) => {
          setLoader((prev) => !prev);
        });
    } else {
      setValid((prev) => !prev);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-[black] flex justify-center items-center">
      <Card className="bg-[white] w-[40%] h-1/2 p-4">
        <p className="text-[19px] font-bold">Currency Converter</p>
        <Box component={"div"} className=" flex flex-col gap-4">
          <Box component={"div"} className="grid grid-cols-3 mt-5">
            <FormControl fullWidth>
              <p>From</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                placeholder="Select option"
                value={countryFromTo?.from ?? ""}
                name="from"
                onChange={onChange}
                className="h-10 col-span-1"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 150,
                      "& .MuiMenuItem-root": {
                        height: "30px",
                        fontSize: "14px",
                      },
                    },
                  },
                }}
              >
                {Object.keys(countryList?.obj ?? {}).map((ele) => (
                  <MenuItem
                    sx={{ height: "30px", fontSize: "14px" }}
                    value={ele}
                    key={ele}
                  >
                    {ele}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              component={"div"}
              className="col-span-1 items-center flex justify-center"
            >
              <SwapHorizontalCircleOutlinedIcon
                sx={{
                  fontSize: 30,
                  cursor: "pointer",
                  mt: 3,
                }}
                onClick={() => {
                  setCountryFromTo((prev) => {
                    const copyFrom = prev.from;
                    const copyTo = prev.to;
                    const data = {
                      ...prev,
                      from: copyTo,
                      to: copyFrom,
                    };
                    return { ...data };
                  });
                }}
              />
            </Box>
            <FormControl fullWidth>
              <p>To</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="h-10 col-span-1"
                value={countryFromTo?.to ?? ""}
                name="to"
                onChange={onChange}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 150,
                      "& .MuiMenuItem-root": {
                        height: "30px",
                        fontSize: "14px",
                      },
                    },
                  },
                }}
              >
                {Object.keys(countryList?.obj ?? {}).map((ele) => (
                  <MenuItem
                    sx={{ height: "30px", fontSize: "14px" }}
                    value={ele}
                    key={ele}
                  >
                    {ele}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <p>Amount</p>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              name="amount"
              value={countryFromTo?.amount}
              error={
                (!valid && countryFromTo?.amount?.length) ||
                (valid && !countryFromTo?.amount?.length)
              }
              onChange={onChange}
              helperText={
                !valid && countryFromTo?.amount?.length
                  ? "Enter Valid Number"
                  : valid && !countryFromTo?.amount?.length
                  ? "Amount Required"
                  : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "43px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "5px",
                },
              }}
              placeholder="Enter the Currency Digit..."
            />
          </Box>
          <Box component={"div"} className="flex justify-between mb-3">
            <Button
              variant="contained"
              onClick={() => onConvert(countryFromTo)}
              disabled={loader}
            >
              Convert
            </Button>
            <Box component={"div"} className="text-end mb-3 text-[green]">
              {loader ? (
                <CircularProgress
                  color="success"
                  size={"27px"}
                  className="mt:2"
                />
              ) : (
                <p>{`Converted Amount is - ${
                  typeof result === "number" ? result?.toFixed(2) : result
                }`}</p>
              )}
            </Box>
          </Box>
        </Box>
      </Card>
    </div>
  );
}

export default App;
