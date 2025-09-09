import {  AccountCircleOutlined, AddAPhoto, Build, CarRepair, Close, Email, EmailOutlined, Error, Info, PersonOutlineOutlined } from '@mui/icons-material'
import {  Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Tooltip } from '@mui/material'
import { styled } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Toptag from '../../components/topTag/Toptag'
import Loader from '../../components/loader/Loader'
import API, { BASE_URL } from '../../Api'
import { BackPaper, BusinessLink, BusinessName, DetailLabel, DetailText } from '../../components/Styles'
import moment from 'moment'
import { getRequest, postRequest } from '../../ApiFunction'
import toast from 'react-hot-toast'
import { setUser } from '../../slice/userInfo'
import { useDispatch } from 'react-redux'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [edit, setEdit] = useState(false)
    const [image, setImage] = useState("")
    const [image2, setImage2] = useState(null)
    const [obj, setObj] = useState({ name: "" })
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const [open, setOpen] = React.useState(false);

    const imageChange = (e) => {
        setImage2(e.target.files[0])
        let data = {
            image: e.target.files[0]
        }
        localStorage.setItem('image',JSON.stringify(data))
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    const handleChange = () => {
        setEdit(true)
        setOpen(true);
    }


    const addData = (e) => {
        setObj({
            ...obj,
            [e.target.name]: e.target.value,
        })
    }


    const getAll = async () => {
        try {
            const result = await getRequest(`${API.ADMIN_PROFILE}`);
            if (!result.data.status) {
                if (result.data.code === 205) {
                    toast.error(result.data.message)
                  } else if (result.data.code === 201) {
                    toast.error(result.data.message)
                  } else if (result.data.code === 203) {
                    toast.error(result.data.message)
                    navigate('/')
                    localStorage.clear()
                  } else {
                    toast.error(result.data.message)
                  }
            } else {
                setObj(result.data.data)
                dispatch(setUser(result.data.data));
                localStorage.setItem("user", JSON.stringify(result.data.data));
                await delay(1000);
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error.message)
        }
    }







    const update = async () => {
        try {
            const formData = new FormData()
            formData.append("name", obj.name)
            formData.append("profile_pic", image2===null?obj.profile_pic:image2)
            const result = await postRequest(`${API.UPDATE_ADMIN}`, formData);
            if (!result.data.status) {
                if (result.data.code === 205) {
                    toast.error(result.data.message)
                  } else if (result.data.code === 201) {
                    toast.error(result.data.message)
                  } else if (result.data.code === 203) {
                    toast.error(result.data.message)
                    navigate('/')
                    localStorage.clear()
                  } else {
                    toast.error(result.data.message)
                  }
            } else {
                setIsLoading(false)
                setEdit(false)
                setOpen(false)
                setImage('')
                setImage2(null)
                getAll()
                setMessage('')
                toast.success(result.data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const discardChanges = () => {
        setOpen(false)
        setEdit(false)
        getAll()
        setImage('')
        setImage2(null)
    }

    const handleClose = () => {
        setOpen(false)
        setEdit(false)
        setImage('')
        setImage2(null)
    }
    useEffect(() => {
        setIsLoading(true)
        getAll()
    }, [])

    return (
        <>
            {isLoading ?
                <Loader />
                :
                <>
                    <Toptag />
                    <BackPaper>
                        <div className='d-flex justify-content-between align-items-center p-2'>
                            <div className='detailHeading'>Account Information</div>
                            <div className='userDate'>This Profile is created on {moment(obj.createdAt).format('LLL')}</div>
                        </div>
                        <div className='d-flex p-2  flex-row gap-3 justify-content-start align-items-center'>
                            {obj.profile_pic !== '' ? (
                                <>
                                    <img src={`${BASE_URL}uploads/images/${obj.profile_pic}`} alt="user" className='user-detailsImage' />
                                </>
                            ) : (
                                <img src="/images/blank_pic.png" className='user-detailsImage' alt="" />

                            )}
                            <div className='d-flex flex-column gap-2 justify-content-start align-items-start'>
                                <BusinessName>{obj.name} {obj.premiumStatus ? <Tooltip title="Premium User"><img src="/images/emailVerifiedIcon.svg" alt="emailVerifiedIcon.svg" /></Tooltip> : null} {obj.isBlocked ? <i style={{ color: "red" }} className="fa-solid fa-ban"></i> : null}</BusinessName>
                                <BusinessLink><Email style={{ fontSize: "13px" }} />{obj.email}</BusinessLink>
                            </div>
                        </div>
                        <div className='w-100 text-end d-flex gap-4 justify-content-end'>
                            {!edit ?
                                <button className='tripiBtn' onClick={handleChange}>Edit Profile</button>
                                :
                                null
                            }
                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-4'>
                                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" style={{ borderRight: "2px solid lightgrey" }} >
                                   
                                </Grid>
                            </div>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-8'>
                                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                                    <Grid item>
                                        <DetailLabel><AccountCircleOutlined className='detailIcon' /> Name:</DetailLabel>
                                    </Grid>
                                    <Grid item className='w-100'>
                                        <input type="text" disabled value={obj.name} className="detailBarInput" />
                                    </Grid>
                                    <Grid item>
                                        <DetailLabel><EmailOutlined className='detailIcon' /> Email:</DetailLabel>
                                    </Grid>
                                    <Grid item className='w-100'>
                                        <input type="text" disabled value={obj.email} className="detailBarInput" />
                                    </Grid>
                                    <Grid item>
                                        <DetailLabel><PersonOutlineOutlined className='detailIcon' /> Role:</DetailLabel>
                                    </Grid>
                                    <Grid item className='w-100'>
                                        <input type="text" disabled value={obj.role} className="detailBarInput" />
                                    </Grid>


                                </Grid>
                            </div>
                        </div>
                        <BootstrapDialog
                            fullWidth={true}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                            maxWidth={'sm'}
                        >
                            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                Edit Profile
                            </DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <Close />
                            </IconButton>
                            <DialogContent dividers>
                                <Grid container spacing={2}>
                                    <Grid xs={12} sm={12} md={6} lg={5} item >
                                        <Grid container spacing={3} direction="column" justifyContent="flex-start" alignItems="center">
                                            <Grid item>
                                                {image !== "" ?
                                                    <img src={image} className='user-detailsImage' alt="" />
                                                    :
                                                    <>
                                                        {obj.profile_pic !== '' ? (
                                                            <img src={`${BASE_URL}uploads/images/${obj.profile_pic}`} alt="user" className='user-detailsImage' />

                                                        ) : (
                                                            <img src="/images/blank_pic.png" className='user-detailsImage' alt="" />

                                                        )}
                                                    </>}
                                            </Grid>
                                            <Grid item>
                                                <label htmlFor='uploadImage'>
                                                    <Tooltip title="click to change image">
                                                        <AddAPhoto className='imageUploadIcon' />
                                                    </Tooltip>
                                                </label>
                                                <input id='uploadImage' onChange={imageChange} accept='image/*' type='file' style={{ display: "none" }} />
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                    <Grid xs={12} sm={12} md={6} lg={7} item>
                                        <Grid container spacing={1} direction="column" justifyContent="flex-start" alignItems="flex-start">
                                            <Grid item>Name:</Grid>
                                            <Grid item style={{ width: "100%" }}>
                                                <input type="text" disabled={!edit ? true : false} value={obj.name} name="name" id='name' onChange={addData} className="detailBarInput" style={{ border: message !== '' && message.startsWith('name') ? "1px solid red" : null }} />
                                            </Grid>
                                            <Grid item>Email:</Grid>
                                            <Grid item style={{ width: "100%" }}>
                                                <input type="text" disabled value={obj.email} className="detailBarInput" name='email' id='email' onChange={addData} style={{ border: message !== '' && message.startsWith('email') ? "1px solid red" : null }} />
                                            </Grid>
                                            <Grid item>Role:</Grid>
                                            <Grid item style={{ width: "100%" }}>
                                                <select disabled={!edit ? true : false} value={obj.role} className="detailBarInput" name='role' id='role' onChange={addData} style={{ border: message !== '' && message.startsWith('role') ? "1px solid red" : null }}>
                                                    <option value="">Select Role:-</option>
                                                    <option value="user">User</option>
                                                    <option value="sub-admin">Admin</option>
                                                </select>
                                            </Grid>
                                            <Grid item>
                                                <div className='errText'>
                                                    {message !== '' ? <div className='errText'><Error style={{ fontSize: "18px" }} /> All feilds are required!</div> : null}
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <button className="tripiBtn" onClick={discardChanges}>
                                    Cancel
                                </button>
                                <button className="tripiBtn" autoFocus onClick={update}>
                                    Save
                                </button>
                            </DialogActions>
                        </BootstrapDialog>
                    </BackPaper>
                </>}

        </>
    )
}

export default Profile