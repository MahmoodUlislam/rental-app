import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { DataGrid } from '@mui/x-data-grid';
import SearchBar from "material-ui-search-bar";
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

const rows = datas.map((data, index) => {
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

// modal displaying for book

function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpenBook = () => {
        setOpen(true);
    };
    const handleCloseBook = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpenBook}>Open Child Modal</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleCloseBook}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <p id="child-modal-description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                    <Button onClick={handleCloseBook}>Close Child Modal</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
// modal displaying for return

function ChildModalRetrun() {
    const [open, setOpen] = React.useState(false);
    const handleOpenBook = () => {
        setOpen(true);
    };
    const handleCloseReturn = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpenReturn}>Open Child Modal</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleCloseReturn}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <p id="child-modal-description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                    <Button onClick={handleCloseReturn}>Close Child Modal</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default function DataTable() {
    // for search by name
    const [searched, setSearched] = React.useState([]);
    const requestSearch = (searchedVal) => {
        const ProfileSearchArray = datas.filter((datas) => {
            return data.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setProfile(dataArray);
    };
    const cancelSearch = () => {
        setSearched([]);
        requestSearch(searched);
    };


    // for setting the search value of the user name, which is set from the data array.
    const rentProfile = datas;


    // for modal
    const [open, setOpen] = React.useState(false);
    const handleOpenBook = () => setOpen(true);
    const handleCloseBook = () => setOpen(false);
    const handleOpenReturn = () => setOpen(true);
    const handleCloseReturn = () => setOpen(false);

    // for setting the default date of the date picker field.
    const [fromDate, setfromDate] = React.useState(
        new Date(new Date("2016-07-04"))
    );
    const [toDate, setToDate] = React.useState(
        new Date(new Date())
    );

    // for formatting the date to be used in the next render component, to be calculated for selected user status.
    function formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    // for generating the result of customer based on user status and date.
    const formSubmitHandler = (e) => {
        e.preventDefault();
        let From = formatDate(fromDate);
        let To = formatDate(toDate);
        const dataArray = [];

        //  calculating the logic for the selected user status based on date & meals ordered.
        files.forEach((element) => {
            let count = 0;

            Object.keys(element.calendar.dateToDayId).forEach(function (dayId) {
                if (
                    new Date(From) <= new Date(dayId) &&
                    new Date(To) >= new Date(dayId)
                ) {
                    Object.keys(element.calendar.mealIdToDayId).forEach(function (
                        mealId
                    ) {
                        if (
                            element.calendar.dateToDayId[dayId] ===
                            element.calendar.mealIdToDayId[mealId]
                        ) {
                            count++;
                        }
                    });
                }
            });

            // condition applied for calculating the user status based on the meals ordered.
            if (userStatus === "active") {

                if (count >= 5 && count <= 10) {
                    dataArray.push(element.profile);
                }

            } else if (userStatus === "superactive") {

                if (count > 10) {
                    dataArray.push(element.profile);
                }

            } else if (userStatus === "bored") {

                if (count === 0) {
                    dataArray.push(element.profile);
                }

            }
            setProfile(dataArray);
        });
    };

    return (
        <div style={{ height: 550, width: '100%', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Autocomplete
                    style={{ width: "200px", marginBottom: "10px" }}
                    id="free-solo-demo"
                    freeSolo
                    options={rentProfile.map((option) => option.name)}
                    renderInput={(props) =>
                        <SearchBar {...props}
                            placeholder="Search by name"
                            value={searched}
                            onChange={(searchVal) => requestSearch(searchVal)}
                            onCancelSearch={() => cancelSearch()}
                        />}
                />
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
                        open={open}
                        onClose={handleCloseBook}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>
                            <h2 id="parent-modal-title">Text in a modal</h2>
                            <p id="parent-modal-description">
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </p>
                            <ChildModal />
                        </Box>
                    </Modal>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Button variant="contained" onClick={handleOpenReturn}>Return</Button>
                    <Modal
                        open={open}
                        onClose={handleCloseReturn}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>
                            <h2 id="parent-modal-title">Text in a modal</h2>
                            <p id="parent-modal-description">
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </p>
                            <ChildModal />
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
    );
}