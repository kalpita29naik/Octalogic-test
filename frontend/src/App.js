import { useState } from 'react';
import './App.css';
import { Button, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material"
import { useEffect } from 'react';

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

  const [step, setStep] = useState(1);
  const [vehicleTypes, setVehiclesTypes] = useState([]);
  const [vehiclesName, setVehiclesName] = useState([]);

  useEffect(() => {
    if (step === 3 && formData.wheels) {
      fetch(`http://localhost:5000/vehicle-types?wheels=${formData.wheels}`)
        .then(res => res.json())
        .then(data => setVehiclesTypes(data))
        .catch(err => console.log(err));
    }

  }, [step, formData.wheels]);

  // useEffect(() => {
  //   if (step === 4 && formData.vehicleType) {
  //     fetch(`http://localhost:5000/vehicles?typeId=${formData.vehicleType}`)
  //       .then(res => res.json())
  //       .then(data => setVehiclesName(data))
  //       .catch(err => console.log(err));
  //   }
  // }, [step, formData.vehicleType]);

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
        if (!formData.firstName || !formData.lastName) return alert("Enter your name");
        break;

      case 2:
        if (!formData.wheels) return alert("Select your choice of wheels");
        break;

      case 3:
        if (!formData.vehicleType) return alert("Select your choice of Vehicles");
        break;

      case 4:
        if (!formData.vehicle) return alert("Select your choice of Vehicle Model");
        break;

      case 5:
        if (!formData.startDate || !formData.endDate) return alert("Select Dates");

        console.log("Selected VehicleType:", formData.vehicleType);
        console.log("Selected Vehicle:", formData.vehicle);


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

          console.log("Selected vehicleType:", formData.vehicleType);
          console.log("Available vehicleTypes:", vehicleTypes);

          if (res.ok) {
            alert("Booking sucessfull");
            console.log(result);
          } else {
            alert(result.error || "Bookign failed");
          }

        } catch (err) {
          console.log(err);
          alert("Server err")
        }
        return;


      default: break;

    }
    setStep(step + 1)
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-[#F2F9FF]'>
      <div className='p-6 rounded-lg shadow-blue-200 shadow-xl w-96'>

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

          </div>
        )}

        {step === 5 && (
          <div>
            <h1 className='text-3xl'>Select Your Dates</h1>
            <div className='flex flex-col mt-6'>
              <label>Start Date</label>
              <TextField
                type='date'
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}

              />
            </div>

            <div className='flex flex-col mt-6'>
              <label>End Date</label>
              <TextField
                type='date'
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}

              />
            </div>







          </div>
        )}

        {/* button */}
        <div onClick={handleNext} className='mt-6'>
          <Button variant='contained' className='w-full'>{step === 5 ? "Submit" : "Next"}</Button>
        </div>
      </div>
    </div >
  );
}

export default App;
