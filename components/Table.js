import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { ChildModalBook, ChildModalReturn } from './ChildModals';
let datas = require('../data/Data.json');

// modal styling
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function DataTable() {
    // for search by name
    const [searched, setSearched] = React.useState("");

    // for setting the datas of table after passing search filter of the search bar
    const columns = [
        { field: 'id', headerName: '#', width: 70 },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'code', headerName: 'Code', width: 100 },
        {
            field: 'availability',
            headerName: 'Availability',
            sortable: false,
            description: 'This column has value of boolean and is not sortable.',
            width: 100,
        },
        {
            field: 'needing_repair',
            headerName: 'Need to repair',
            description: 'This column has value of boolean and is not sortable.',
            sortable: false,
            width: 150,
        },
        { field: 'durability', headerName: 'Durability', width: 100, },
        { field: 'mileage', headerName: 'Mileage', width: 100, },
        { field: 'type', headerName: 'Type', width: 100, },
        { field: 'maxDurability', headerName: 'Max_durability', width: 100, },
        { field: 'price', headerName: 'Price', width: 100, },
        { field: 'minimumRentPeriod', headerName: 'Minimum_rent_period', width: 200, }
    ];

    const rows =
        datas.filter((data) => {

            if (searched === "") {
                return datas;
            }
            else if (data.name.toLowerCase().includes(searched)) {
                return searched;
            }

        }).map((data, index) => {
            return {
                id: index + 1,
                name: data.name,
                code: data.code,
                availability: data.availability ? 'available' : 'not available',
                needing_repair: data.needing_repair ? 'need to repair' : 'no need to repair',
                durability: data.durability,
                mileage: data.mileage,
                type: data.type,
                maxDurability: data.max_durability,
                price: data.price,
                minimumRentPeriod: data.minimum_rent_period
            };
        });

    // for modal
    const [openBook, setOpenBook] = React.useState(false);
    const [openReturn, setOpenReturn] = React.useState(false);

    const handleOpenBook = () => setOpenBook(true);
    const handleCloseBook = () => setOpenBook(false);
    const handleOpenReturn = () => setOpenReturn(true);
    const handleCloseReturn = () => setOpenReturn(false);

    const [itemPrice, setItemPrice] = React.useState();
    const [mileage, setMileage] = React.useState();

    // for setting the default date of the date picker field.
    const [fromDate, setFromDate] = React.useState(
        new Date(new Date())
    );
    const [toDate, setToDate] = React.useState(
        new Date(new Date(Date.now() + (3600 * 1000 * 24)))
    );

    const handleChangeName = (event) => {
        const {
            target: { value },
        } = event;

        setItemPrice(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChangeMileage = (event) => {
        const {
            target: { value },
        } = event;
        setMileage(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    // select option in modal 
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    return (
        <div style={{ height: 550, width: '100%', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <input style={{ width: '300px', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    type="text"
                    placeholder="Search by name"
                    value={searched}
                    onChange={(e) => setSearched(e.target.value)} />
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[15]}
                pagination
                disableSelectionOnClick
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 25 }}>

                {/* for book button & it's modal */}
                <div style={{ marginTop: '20px' }}>
                    <Button variant="contained" onClick={handleOpenBook}>Book</Button>
                    <Modal
                        open={openBook}
                        onClose={handleCloseBook}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>
                            <h1 id="parent-modal-title">Book a product</h1>
                            <div>
                                <FormControl sx={{ mb: 1, width: "100%" }}>

                                    <InputLabel id="demo-simple-select-label">Name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={itemPrice}
                                        label="item name"
                                        onChange={handleChangeName}
                                    >
                                        {datas.map((data) => (
                                            <MenuItem
                                                key={data.code}
                                                value={data.price}
                                            >
                                                {data.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div >
                                <Divider sx={{ width: "100%" }} />
                                <div className="dateSelection">
                                    <div style={{ padding: '15px' }}  >
                                        <label style={{ marginRight: "5px" }} htmlFor="startDate">
                                            From
                                        </label>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                name="from_date"
                                                value={fromDate}

                                                onChange={(newValue) => {
                                                    setFromDate(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <div style={{ padding: '20px' }} >
                                        <label
                                            style={{ marginRight: "15px" }}
                                            htmlFor="endDate"
                                        >
                                            To
                                        </label>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                name="to_date"
                                                value={toDate}
                                                onChange={(newValue) => {
                                                    setToDate(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>

                            {/* Child modal for book */}
                            <div style={{ textAlign: 'right' }}>
                                <ChildModalBook toDate={toDate} fromDate={fromDate} itemPrice={itemPrice} handleCloseBook={(e) => handleCloseBook(e.target.value)} />
                            </div>
                        </Box>
                    </Modal>
                </div>

                {/* for Return button & it's modal */}
                <div style={{ marginTop: '20px' }}>
                    <Button variant="contained" onClick={handleOpenReturn}>Return</Button>
                    <Modal
                        open={openReturn}
                        onClose={handleCloseReturn}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>
                            <h1 id="parent-modal-description">
                                Return a product
                            </h1>
                            <Divider sx={{ width: "100%" }} />
                            <div>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-simple-select-label">Name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={itemPrice}
                                        label="item name"
                                        onChange={handleChangeName}
                                    >
                                        {datas.map((data) => (
                                            <MenuItem
                                                key={data.code}
                                                value={data.price}
                                            >
                                                {data.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-simple-select-label">Mileage</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={mileage}
                                        onChange={handleChangeMileage}
                                        input={<OutlinedInput label="Mileage" />}
                                        MenuProps={MenuProps}
                                    >
                                        {datas.map((data) => (
                                            <MenuItem
                                                key={data.code}
                                                value={data.mileage}
                                            >
                                                {data.mileage}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>
                            </div>

                            {/* Child modal for Return */}
                            <ChildModalReturn itemPrice={itemPrice} mileage={mileage} handleCloseReturn={(e) => handleCloseReturn(e.target.value)} />
                        </Box>
                    </Modal>
                </div>
            </div>
        </div >
    );
}