import React, { useState } from 'react'
import { Button, DialogContent, DialogActions, Dialog, DialogTitle, TextField, Typography } from '@material-ui/core'
import axios from 'axios';

import { getPDF } from '../../ParcelPendingPDF';



export default function PopUpForm() {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; //Regex to check phone number


    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [propertyName, setPropertyName] = useState('');
    const [propertyAddress, setPopertyAddress] = useState('');
    const [contact, setContact] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');



    const handleClickOpen = () => {

        if (window.hasConsole) {


            var threekitBOM = window.threekit.controller.getBom();
            var tempBOM = {};
            for (var key in threekitBOM) {

                if (key.includes("Tower")) {
                    if (threekitBOM[key]) {
                        var label = threekitBOM[key].label;
                        if (label) {

                            if (!tempBOM[label]) {
                                tempBOM[label] = 0;
                            }
                            tempBOM[label]++;

                        }
                    }
                }
            }

            let flag = false;

            try {
                threekitBOM['finalMaterial']['label'];
            } catch (error) {
                flag = true;
            }

            if (flag) {

                window.alert('Please select a color or a pattern')

            }
            else {

                setOpen(true);
            }

        }
        else
            window.alert('Select a console.')
    };

    const handleCancel = () => {
        setOpen(false);
        setAlertOpen(false);
    }


    const handleSumbit = () => {


        if ((contact.trim().length == 0) == false && (email.trim().length == 0) == false && (phone.match(re) == null) == false && (propertyAddress.trim().length == 0) == false && (propertyName.trim().length == 0) == false && (projectName.trim().length == 0) == false) {

            let userInfo = {
                phone: phone,
                projectName: projectName,
                contact: contact,
                propertyAddress: propertyAddress,
                email: email,
                propertyName: propertyName
            }
            getPDF(userInfo);
            setOpen(false);
            setAlertOpen(true);
        }
    }

    return (
        <>
            <div>
                <Button variant="contained" onClick={handleClickOpen}>
                    Download PDF
                </Button>
                <Dialog open={open} onClose={handleCancel}>
                    <DialogContent style={{ textAlign: 'center' }}>
                        <DialogTitle>Enter Details</DialogTitle>
                        <TextField className='text_input' error={projectName.trim().length == 0} helperText='Enter Project Name' id='project_name' label='Project Name' onChange={(e) => setProjectName(e.target.value)} />
                        <TextField className='text_input' error={propertyName.trim().length == 0} id='property_name' label='Property Name' onChange={(e) => setPropertyName(e.target.value)} />
                        <TextField className='text_input' error={propertyAddress.trim().length == 0} id='property_address' label='Property Address' onChange={(e) => setPopertyAddress(e.target.value)} />
                        <TextField className='text_input' error={(phone.match(re) == null)} id='phone' label='Phone' helperText='Enter only numbers' inputProps={{ inputMode: 'number', pattern: '[0-9]', maxLength: 11 }} onChange={(e) => setPhone(e.target.value)} />
                        <TextField className='text_input' error={email.trim().length == 0} id='email' label='Email' onChange={(e) => setEmail(e.target.value)} />
                        <TextField className='text_input' error={contact.trim().length == 0} id='contact' label='Contact' onChange={(e) => setContact(e.target.value)} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button onClick={handleSumbit}>Sumbit</Button>
                    </DialogActions>
                </Dialog>
                
                <Dialog open={alertOpen} onClose={handleCancel}>
                    <DialogContent style={{ textAlign: 'center' }}>
                        <Typography>A PDF dowload will start shortly</Typography>
                        <Button variant='contained' onClick={handleCancel}>Okay!</Button>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}


