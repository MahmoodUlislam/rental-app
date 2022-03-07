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
import { useTheme } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
let datas = require('../data/Data.json');

const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'name', headerName: 'name', width: 300 },
    { field: 'code', headerName: 'code', width: 100 },
    {
        field: 'availability',
        headerName: 'availability',
        sortable: false,
        description: 'This column has value of boolean and is not sortable.',
        width: 200,
    },
    {
        field: 'needing_repair',
        headerName: 'need to repair',
        description: 'This column has value of boolean and is not sortable.',
        sortable: false,
        width: 200,
    },
    { field: 'Durability', headerName: 'Durability', width: 200, },
    { field: 'Mileage', headerName: 'Mileage', width: 200, },
];



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
    // for setting all the datas of the searched in an array to be used in the next render component.
    const [profile, setProfile] = React.useState([]);
    // for setting the value of the search bar
    const requestSearch = (searchVal) => {
        const dataArray = datas.filter((data) => {
            return [data.name.toLowerCase().includes(searchVal.toLowerCase())];
        });
        setSearched(dataArray);
    };
    const cancelSearch = () => {
        setSearched([]);
        requestSearch(searched);
    };

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
                Durability: data.durability,
                Mileage: data.mileage,
            };
        });
    // for setting the search value of the user name, which is set from the data array.
    // const rentProfile = datas;

    // for modal
    const [open, setOpen] = React.useState(false);
    const [openBook, setOpenBook] = React.useState(false);
    const [openReturn, setOpenReturn] = React.useState(false);
    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);
    const handleOpenBook = () => setOpenBook(true);
    const handleCloseBook = () => setOpenBook(false);
    const handleOpenReturn = () => setOpenReturn(true);
    const handleCloseReturn = () => setOpenReturn(false);


    // Child modal displaying for book
    function ChildModalBook(props) {
        const [open, setOpen] = React.useState(false);
        const [openBook, setOpenBook] = React.useState(false);
        const handleOpenModal = () => setOpen(true);
        const handleCloseModal = () => setOpen(false);
        const handleOpenBook = () => setOpenBook(true);
        const handleCloseBook = () => setOpenBook(false);



        return (
            <React.Fragment>
                <Button onClick={handleCloseModal}>No</Button>
                <Button onClick={handleOpenBook}>Yes</Button>
                <Modal
                    open={openBook}
                    onClose={handleCloseBook}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style, width: 500 }}>
                        <p id="child-modal-description">
                            Total price is:  ?
                        </p>
                        <Button onClick={handleCloseBook}>Confirm</Button>
                    </Box>
                </Modal>
            </React.Fragment >
        );
    }

    // Child modal displaying for return

    function ChildModalRetrun() {
        const [openReturn, setOpenReturn] = React.useState(false);
        const handleOpenReturn = () => setOpenReturn(true);
        const handleCloseReturn = () => setOpenReturn(false);


        return (
            <React.Fragment>
                <Button onClick={handleCloseModal}>No</Button>
                <Button onClick={handleOpenReturn}>Yes</Button>
                <Modal

                    open={openReturn}
                    onClose={handleCloseReturn}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style, width: 200 }}>
                        <p id="child-modal-description">
                            Do you want to return?
                        </p>
                        <Button onClick={handleCloseReturn}>Confirm</Button>
                    </Box>
                </Modal>

            </React.Fragment>
        );
    }


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

    const list = datas.map((data, index) => {
        return {
            id: index + 1,
            name: data.name,
            code: data.code,
            availability: data.availability ? 'available' : 'not available',
            needing_repair: data.needing_repair ? 'need to repair' : 'no need to repair',
            Durability: data.durability,
            Mileage: data.mileage,
        };
    }
    );

    function getStyles(name, itemName, theme) {
        return {
            fontWeight:
                itemName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    function getStylesMileage(name, mileage, theme) {
        return {
            fontWeight:
                mileage.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const theme = useTheme();
    const [itemName, setItemName] = React.useState([]);
    const [mileage, setMileage] = React.useState([]);

    const handleChangeName = (event) => {
        const {
            target: { value },
        } = event;
        setItemName(
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

    // for setting the default date of the date picker field.
    const [fromDate, setfromDate] = React.useState(
        new Date(new Date("2016-07-04"))
    );
    const [toDate, setToDate] = React.useState(
        new Date(new Date())
    );

    // for formatting the date to be used in the next render component, to be calculated for selected user status.
    // function formatDate(date) {
    //     var d = new Date(date),
    //         month = "" + (d.getMonth() + 1),
    //         day = "" + d.getDate(),
    //         year = d.getFullYear();

    //     if (month.length < 2) month = "0" + month;
    //     if (day.length < 2) day = "0" + day;

    //     return [year, month, day].join("-");
    // }

    // for generating the result of customer based on user status and date.
    // const formSubmitHandler = (e) => {
    //     e.preventDefault();
    //     let From = formatDate(fromDate);
    //     let To = formatDate(toDate);
    //     const dataArray = [];

    //     //  calculating the logic for the selected user status based on date & meals ordered.
    //     files.forEach((element) => {
    //         let count = 0;

    //         Object.keys(element.calendar.dateToDayId).forEach(function (dayId) {
    //             if (
    //                 new Date(From) <= new Date(dayId) &&
    //                 new Date(To) >= new Date(dayId)
    //             ) {
    //                 Object.keys(element.calendar.mealIdToDayId).forEach(function (
    //                     mealId
    //                 ) {
    //                     if (
    //                         element.calendar.dateToDayId[dayId] ===
    //                         element.calendar.mealIdToDayId[mealId]
    //                     ) {
    //                         count++;
    //                     }
    //                 });
    //             }
    //         });

    //         // condition applied for calculating the user status based on the meals ordered.
    //         if (userStatus === "active") {

    //             if (count >= 5 && count <= 10) {
    //                 dataArray.push(element.profile);
    //             }

    //         } else if (userStatus === "superactive") {

    //             if (count > 10) {
    //                 dataArray.push(element.profile);
    //             }

    //         } else if (userStatus === "bored") {

    //             if (count === 0) {
    //                 dataArray.push(element.profile);
    //             }

    //         }
    //         setProfile(dataArray);
    //     });
    // };

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
                                    <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={itemName}
                                        onChange={handleChangeName}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                    >
                                        {datas.map((data) => (
                                            <MenuItem
                                                key={data.code}
                                                value={data.name}
                                                style={getStyles(data.name, itemName, theme)}
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
                                                    setfromDate(newValue);
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
                            <ChildModalBook />
                        </Box>
                    </Modal>
                </div>
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
                                    <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={itemName}
                                        onChange={handleChangeName}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                    >
                                        {datas.map((data) => (
                                            <MenuItem
                                                key={data.code}
                                                value={data.name}
                                                style={getStyles(data.name, itemName, theme)}
                                            >
                                                {data.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-name-label">Mileage</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={mileage}
                                        onChange={handleChangeMileage}
                                        input={<OutlinedInput label="Mileage" />}
                                        MenuProps={MenuProps}
                                    >
                                        {datas.map((data) => (
                                            <MenuItem
                                                key={data.code}
                                                value={data.mileage}
                                                style={getStylesMileage(data.mileage, mileage, theme)}
                                            >
                                                {data.mileage}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            <ChildModalRetrun />
                        </Box>
                    </Modal>
                </div>
            </div>
        </div >
    );
}