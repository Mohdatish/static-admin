import { AccessTimeOutlined, ArticleOutlined, Close, DescriptionOutlined, EmailOutlined, HomeRepairServiceOutlined, LocationOn, WorkspacePremiumOutlined } from '@mui/icons-material'
import { Dialog, DialogContent, DialogTitle,  IconButton} from '@mui/material'
import { styled } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import API, { BASE_URL } from '../../Api'
import { BackPaper,  InnerPaper } from '../../components/Styles'
import moment from 'moment-timezone'
import { postRequest } from '../../ApiFunction'
import toast from 'react-hot-toast'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const ProviderDetails = ({ objs }) => {
    const router = useParams()
    const [certificate, setCertificate] = useState(false)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [address, setAddress] = useState([]);
    const [banners, setBanners] = useState([]);
    const [message, setMessage] = useState('');
    const [edit, setEdit] = useState(false)
    const [obj, setObj] = useState({})
    const [image, setImage] = useState("")
    const [image2, setImage2] = useState(null)
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const [open, setOpen] = React.useState(false);
    const [services, setService] = useState([])






    const getAll = async () => {
        const result = await postRequest(`${API.GET_PROVIDER_DETAILS}`, { id: router.id });
        console.log(result, "eve")
        if (!result.data.status) {
            if (result.data.code === 203) {
                localStorage.remove('adminToken');
                localStorage.clear()
                navigate('/')
                toast.info("Session expired!")
            }
            toast.error(result.data.message)
        } else {
            setObj(result.data.data)
            setBanners(result.data.banners)
            setAddress(result.data.address)
            setService(result.data.services)
            await delay(1000);
            setIsLoading(false)
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
        setCertificate(false)
        setImage2(null)
    }
    useEffect(() => {
        setIsLoading(true)
        getAll()
    }, [])

    console.log(banners)
    return (
        <>
            {isLoading ?
                <Loader />
                :
                <>
                    <div className='topNavigator'>
                        <h4>Business Details</h4>
                        <p>{router.id}</p>
                    </div>
                    <BackPaper>
                        <div className='row service-style'>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-4'>
                                <InnerPaper>
                                    <div className='heading'>{obj.business_name}</div>
                                    <div className='type w-0 mt-1'>{obj.business_type}</div>
                                    <div className='desc mt-4'><EmailOutlined className='icon' />{obj.business_email}</div>
                                    <div className='desc mt-3'><AccessTimeOutlined className='icon' />Opens {moment(obj.opening_time).format('LT')} - {moment(obj.closing_time).format('LT')}</div>
                                    <div className='d-flex mt-3 gap-3 flex-wrap justify-content-start align-items-start'>
                                        {obj.working_days && obj.working_days.map((element, index) => (
                                            <>
                                                <span className="week-badge">{element}</span>
                                            </>
                                        ))}
                                    </div>
                                </InnerPaper>
                            </div>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-4'>
                                <InnerPaper>
                                    <div className='heading'>Certificate</div>
                                    <div className='mt-4 d-flex gap-2 justify-content-start align-items-center'>
                                        <div><WorkspacePremiumOutlined className='icon' /></div>
                                        <div className='desc' style={{ cursor: "pointer" }} onClick={() => { setCertificate(true) }}>Click to view</div>
                                    </div>
                                </InnerPaper>
                            </div>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-4'>
                                <InnerPaper>
                                    <div className='heading'>Gallery</div>
                                    <div className='d-flex gap-3 flex-wrap mt-3'>
                                        {banners && banners.length > 0 ?
                                            <>
                                                {banners && banners.map((element, index) => (
                                                    <img src={BASE_URL + 'uploads/images/' + element.business_banner} kye={index + 1} alt="images" className='banner-provider' />
                                                ))}
                                            </>
                                            :
                                            <img src="/images/noImage.jpg" alt="images" className='banner-provider' />

                                        }
                                    </div>
                                </InnerPaper>
                            </div>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-4'>
                                <InnerPaper>
                                    <div className='heading'>Addresses</div>
                                    <div className='desc mt-4'>
                                        <div className='d-flex gap-2 flex-wrap mt-3 flex-column'>
                                            {address.map((element, index) => (
                                                <div className='d-flex gap-2 justify-content-start align-items-start user-address'>
                                                    <div key={index + 1}><LocationOn className='icon' /></div>
                                                    <div>{element.address}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </InnerPaper>
                            </div>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-4'>
                                <InnerPaper>
                                    <div className='heading'>Special Instruction & Description</div>
                                    <div className='mt-4 d-flex gap-2 justify-content-start align-items-start'>
                                        <div><ArticleOutlined className='icon' /></div>
                                        <div className='desc'>{obj.special_instruction}</div>
                                    </div>
                                    <div className='d-flex mt-3 gap-2 justify-content-start align-items-start'>
                                        <div><DescriptionOutlined className='icon' /></div>
                                        <div className='desc'>{obj.business_description}</div>
                                    </div>
                                </InnerPaper>
                            </div>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-4'>
                                <InnerPaper>
                                    <div className='heading'>Business Services Provided</div>
                                    <div className='d-flex gap-2 flex-column mt-4'>
                                        {services.map((element, index) => (
                                            <div className='d-flex gap-2 justify-content-start align-items-center'>
                                                <div key={index + 1}><HomeRepairServiceOutlined className='icon' /></div>
                                                <div className='desc'>{element.service_name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </InnerPaper>
                            </div>
                        </div>
                       

                        <BootstrapDialog
                            fullWidth={true}
                            aria-labelledby="customized-dialog-title"
                            open={certificate}
                            maxWidth={'sm'}
                        >
                            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                Certificate
                            </DialogTitle>
                            <IconButton onClick={handleClose}
                                aria-label="close" sx={{
                                    position: 'absolute',
                                    right: 8, top: 8, color: (theme) => theme.palette.grey[500],
                                }} >
                                <Close />
                            </IconButton>
                            <DialogContent dividers>
                                {obj.certificate_image !== '' ? (
                                    <>
                                        <img src={`${BASE_URL}uploads/images/${obj.certificate_image}`} alt="user" style={{ width: "100%" }} />
                                    </>
                                ) : (
                                    <img src="/images/noImage.jpg" style={{ width: "100%" }} alt="" />

                                )}
                            </DialogContent>
                        </BootstrapDialog>
                    </BackPaper>
                </>}

        </>
    )
}

export default ProviderDetails