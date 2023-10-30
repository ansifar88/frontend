import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
  Chip,
} from "@material-tailwind/react";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { addPrescription } from "../../api/doctorApi";

export function Prescription({id}) {
  console.log(id,"iiiidd");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const [medicine, setMedicine] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [instruction, setInstruction] = useState("");

  const onChangeMedicine = ({ target }) => setMedicine(target.value);
  const onChangeInstruction = ({ target }) => setInstruction(target.value);

  const handleAdd = () => {
    if (medicine.trim() === "" || medicines.some((item) => item.text === medicine.trim())) {
      return;
    }
    setMedicines([...medicines, { text: medicine.trim() }]);
    setMedicine("");
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    const medicineArray = medicines.map((item) => item.text);
    const data = {
      id :id,
      medicine : medicineArray,
      instruction : instruction
    }
const response = await addPrescription(data)
console.log(response);
  }

  return (
    <>
      <Chip onClick={handleOpen} variant="filled" size="sm" value='Prescription' />
      <Dialog open={open} size="xs" handler={handleOpen}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h4">
              Prescriptions
            </Typography>
          </DialogHeader>
          <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
        </div>
        <DialogBody>
          <div className="grid gap-2">
            <Input
              type="text"
              label="Medicines"
              value={medicine}
              onChange={onChangeMedicine}
              className="w-full"
              variant="standard"
            />
            <Button
              size="sm"
              color={medicine ? "gray" : "blue-gray"}
              disabled={!medicine}
              className="!absolute mt-1 me-3 right-2 rounded"
              onClick={handleAdd}
            >
              add
            </Button>
            {medicines ? medicines.map((m, index) => (
              <p key={index}>{m.text}</p>
            )) : null}
            <Textarea label="Instructions" onChange={onChangeInstruction} value={instruction} variant="outlined" />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="gradient" color="gray" size="sm" type="submit">
            save
          </Button>
        </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}

export default Prescription;
