import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React from 'react';

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


// Child modal displaying for book
export function ChildModalBook(props) {
    const [openBook, setOpenBook] = React.useState(false);
    const [priceBook, setPriceBook] = React.useState();
    const handleOpenBook = () => setOpenBook(true);
    const handleCloseBook = () => setOpenBook(false);

    // for generating the result for Book based on date and price/day.
    const BookSubmitHandler = (e) => {
        e.preventDefault();
        const daysForBooking = Math.ceil((props.toDate - props.fromDate) / (1000 * 3600 * 24));

        if (props.itemPrice === undefined) {
            alert("Please select a item");
            return;
        } else if (props.fromDate === undefined || props.toDate === undefined) {
            alert("Please select the dates");
            return;
        } else if (props.fromDate > props.toDate) {
            alert("Please select the correct dates");
            return;
        } else {
            handleOpenBook();
        }

        setPriceBook(daysForBooking * props.itemPrice);
    };

    return (
        <React.Fragment>
            <Button onClick={props.handleCloseBook}>No</Button>
            <Button onClick={BookSubmitHandler}>Yes</Button>

            <Modal
                open={openBook}
                onClose={handleCloseBook}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <p style={{ textAlign: 'center' }} id="child-modal-description">
                        Your estimated price is ${priceBook}
                    </p>
                    <p style={{ textAlign: 'center' }} id="child-modal-description">
                        Do you want to proceed?
                    </p>

                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={handleCloseBook}>Confirm</Button>
                    </div>
                </Box>
            </Modal>

        </React.Fragment >
    );
}

// Child modal displaying for return
export function ChildModalReturn(props) {
    const [openReturn, setOpenReturn] = React.useState(false);
    const [priceReturn, setPriceReturn] = React.useState();
    const handleOpenReturn = () => setOpenReturn(true);
    const handleCloseReturn = () => setOpenReturn(false);

    // for generating the result return based on date and price/day.
    const ReturnSubmitHandler = (e) => {
        e.preventDefault();

        if (props.itemPrice === undefined) {
            alert("Please select item before returning it.");
            return;
        } else if (props.mileage === undefined) {
            alert("Please select mileage before returning it.");
            return;
        } else {
            handleOpenReturn();
        }
        setPriceReturn(props.mileage * props.itemPrice);
    };

    return (
        <React.Fragment>
            <div style={{ textAlign: 'right' }}>
                <Button onClick={props.handleCloseReturn}>No</Button>
                <Button onClick={ReturnSubmitHandler}>Yes</Button>
            </div>
            <Modal
                open={openReturn}
                onClose={handleCloseReturn}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <p style={{ textAlign: 'center' }} id="child-modal-description">
                        Your total price is ${priceReturn}
                    </p>
                    <p style={{ textAlign: 'center' }} id="child-modal-description">
                        Do you want to proceed?
                    </p>

                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={handleCloseReturn}>Confirm</Button>
                    </div>
                </Box>
            </Modal>

        </React.Fragment>
    );
}