import { useState, useEffect } from 'react';
import './App.css';
import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';


function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    vehicleType: "",
    vehicle: "",
    startDate: "",
    endDate: ""
  });

  const [step, setStep] = useState(1); // to manage screens
  const [vehicleTypes, setVehiclesTypes] = useState([]);
  const [vehiclesName, setVehiclesName] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (step === 3 && formData.wheels) {
      fetch(`http://localhost:5000/vehicle-types?wheels=${formData.wheels}`)
        .then(res => res.json())
        .then(data => setVehiclesTypes(data))
        .catch(err => console.log(err));
    }

  }, [step, formData.wheels]);

  useEffect(() => {
    if (step === 4 && formData.vehicleType) {
      fetch(`http://localhost:5000/vehicles?typeId=${formData.vehicleType}`)
        .then(res => res.json())
        .then(data => {
          console.log("Vehicles API response:", data);
          setVehiclesName(Array.isArray(data) ? data : []);
        })
        .catch(err => console.log(err));
    }
  }, [step, formData.vehicleType]);

  const handleNext = async () => {
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName) {
          setErrors({ step1: "Please enter both first name and last name" });
          return;
        }
        setErrors({});
        break;

      case 2:
        if (!formData.wheels) {
          setErrors({ step2: " Select your choice of wheels" })
          return
        }
        setErrors({});
        break;

      case 3:
        if (!formData.vehicleType) {
          setErrors({ step3: "Select your choice of Vehicles Model" });
          return;
        }
        setErrors({});
        break;

      case 4:
        if (!formData.vehicle) {
          setErrors({ step4: "Select your choice of Vehicle" });
          return;
        }
        setErrors({});
        break;

      case 5:
        if (!formData.startDate || !formData.endDate) {
          setErrors({ step5: "Select Dates" });
          return;
        }
        setErrors({});
        if (new Date(formData.endDate) < new Date(formData.startDate)) {
          setErrors({ step5: "End date should be after the start date" })
          return
        }
        setErrors({});

        try {
          const res = await fetch("http://localhost:5000/booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fname: formData.firstName,
              lname: formData.lastName,
              vehicleId: Number(formData.vehicle),
              w: Number(formData.wheels),
              sdate: formData.startDate,
              edate: formData.endDate,
            })
          });

          const result = await res.json();

          if (res.ok) {
            alert("Booking sucessfull!!");
            setStep(6);




          } else {
            alert(result.error || "Booking failed");
          }

        } catch (err) {
          console.log(err);
          alert("Server error")
        }
        return;

      default: break;

    }
    setStep(step + 1)
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-[#F2F9FF]'>
      <div className='p-6 rounded-lg shadow-blue-200 shadow-xl w-[450px]'>

        {step === 1 && (
          <div>
            <h1 className='text-3xl'>First, What's Your Name?</h1>
            {/* first name div */}
            <div className='flex flex-col mt-6'>
              <label>First Name</label>
              <TextField
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                size='small'


              />
            </div>

            {/* last name div */}
            <div className='flex flex-col mt-6'>
              <label>Last Name</label>
              <TextField
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                size='small'
              />
            </div>

            <p className="text-red-500 text-sm mt-2">{errors.step1}</p>

          </div>


        )}

        {step === 2 && (
          <div>
            <h1 className='text-3xl'>Select Number of Wheels</h1>
            <RadioGroup
              value={formData.wheels}
              onChange={(e) => setFormData({ ...formData, wheels: e.target.value })}
              className='mt-3'
            >
              <FormControlLabel label="4" control={<Radio />} value={4} />
              <FormControlLabel label="2" control={<Radio />} value={2} />
            </RadioGroup>


            <p className="text-red-500 text-sm mt-2">{errors.step2}</p>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className='text-3xl'> Select Type of Vehicle</h1>
            <RadioGroup
              value={formData.vehicleType}
              onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
            >
              {vehicleTypes.map((type) => (
                <FormControlLabel
                  key={type.VTypeID}
                  value={String(type.VTypeID)}
                  control={<Radio />}
                  label={type.type_name}
                />
              ))}
            </RadioGroup>
            <p className="text-red-500 text-sm mt-2">{errors.step3}</p>
          </div>
        )}

        {step === 4 && (
          <div>
            <h1 className="text-3xl">Select Model of Vehicle</h1>
            <RadioGroup
              value={formData.vehicle}
              onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
            >
              {vehiclesName.map((type) => (
                <FormControlLabel
                  key={type.VID}
                  value={String(type.VID)}
                  control={<Radio />}
                  label={type.VName}
                />
              ))}
            </RadioGroup>
            <p className="text-red-500 text-sm mt-2">{errors.step4}</p>
          </div>
        )}

        {step === 5 && (
          <div>
            <h1 className='text-3xl'>Select Your Dates</h1>
            <Box className="mt-6">
              <DateRangePicker
                value={[formData.startDate, formData.endDate]}
                onChange={(newValue) => {
                  setFormData({ ...formData, startDate: newValue[0], endDate: newValue[1] });
                }}
                className='w-full'
              />
            </Box>




            <p className="text-red-500 text-sm mt-2">{errors.step5}</p>
          </div>
        )}

        {step === 6 && (
          <div >
            <div className='text-xl font-bold mb-3 text-green-600'>Congratulation!! Your Vehicle is Booked</div>

            <div className='space-y-2 text-lg'>

              <div className='pb-2'>
                Customer Name :
                <span className='font-bold'> {formData.firstName} {formData.lastName}</span>
              </div>

              <div className='pb-2'>
                Car Booked :
                <span className='font-bold'>
                  {vehicleTypes.find(v => String(v.VTypeID) === formData.vehicleType)?.type_name}
                  {" "}
                  {vehiclesName.find(v => String(v.VID) === formData.vehicle)?.VName}
                </span>
              </div>

              <div className='pb-4'>
                Booking Dates :
                <span className='font-bold'>{formData.startDate} to {formData.endDate}</span>
              </div>
            </div>

            <Button
              variant='contained'
              className='w-full '
              onClick={() => {
                setFormData({
                  firstName: "",
                  lastName: "",
                  wheels: "",
                  vehicleType: "",
                  vehicle: "",
                  startDate: "",
                  endDate: ""
                });
                setStep(1)

              }}>Finish</Button>
          </div>
        )
        }


        {step !== 6 && (
          <div onClick={handleNext} className='mt-6'>
            <Button variant='contained' className='w-full'>{step === 5 ? "Submit" : "Next"}</Button>
          </div>
        )}
      </div>
    </div >
  );
}

export default App;
