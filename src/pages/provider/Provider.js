import { AttachEmail,  BusinessOutlined, Close, DeleteOutlineOutlined, LockOpenOutlined, LockOutlined, Pageview, Search, VisibilityOutlined } from '@mui/icons-material'
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { deleteRequest, getRequest, postRequest } from "../../ApiFunction"
import { useSelector } from 'react-redux'
import API, { BASE_URL } from '../../Api'
import { BackPaper, DetailText } from '../../components/Styles'
import moment from 'moment'
import toast from 'react-hot-toast'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Provider = () => {
  const providersCount = useSelector(state => state.count.counts.providerCount);
  const [isLoading, setIsLoading] = useState(true)
  const [certificate, setCertificate] = useState(false)
  const [email, setEmail] = useState(false)
  const error = useSelector(state => state.count.error);
  const [all, setAll] = useState([]);
  const navigate = useNavigate();
  const [row, setRow] = useState('7');
  const [skip, setSkip] = useState('0')
  const [key, setKey] = useState("")
  const [open, setOpen] = React.useState(false);
  const [remopen, setRemOpen] = React.useState(false);
  const [id, setId] = useState()
  const [status, setStatus] = useState()
  const [obj, setObj] = useState({})




  if (error === 203) {
    localStorage.clear();
    navigate('/')
    toast.info("Session expired")
  }

  const handleClose = () => {
    setEmail(false)
    setCertificate(false)
  }

  const handleView = (data) => {
    setCertificate(true)
    setObj(data)
  }

  const handleEmail = (data) => {
    setEmail(true)
    setObj(data)
  }

  const handleBlockOpen = (id, status) => {
    setId(id)
    setStatus(status)
    setOpen(true);
  };

  const handleBlock = () => {
    setOpen(false);
  };

  const handleRemoveOpen = (id) => {
    setId(id)
    setRemOpen(true);
  };

  const handleRemove = () => {
    setRemOpen(false);
  };

  const searchHandle = (event) => {
    const newQuery = event.target.value.trim();
    setKey(newQuery)
    setSkip(0);
  }







  const removeUser = async (id) => {
    try {
      const result = await deleteRequest(`${API.DELETE_PROVIDER}`, { id: id })
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
        toast.success(result.data.message)
        getAll()
        setRemOpen(false)
      }
    } catch (error) {
      console.log(error.message)
    }
  }



  const BlockUser = async (id) => {
    try {
      const result = await postRequest(`${API.BLOCK_UNBLOCK_PROVIDER}`, { id: id });
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
        toast.success(result.data.message)
        getAll()
        setOpen(false)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const VerifyNow = async (id) => {
    try {
      const result = await postRequest(`${API.VERIFY_PROVIDER}`, { _id: obj._id });
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
        toast.success(result.data.message)
        getAll()
        handleClose()
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const getAll = async () => {
    const result = await getRequest(`${API.GET_ALL_PROVIDER}?value=${key}&row=${row}&skip=${skip}`);
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
      setAll(result.data.data)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getAll()
  }, [key, row, skip])


  const handleChange = (e) => {
    if (e.target.value === providersCount) {
      setSkip(0)
      setRow(providersCount)
    } else {
      setRow(e.target.value)
    }
  };
  const skipPagination = (e, page) => {
    setSkip((page - 1) * row)
  }


  return (
    <>


      {
        isLoading ? (
          <Loader />) : (
          <>
            <div className='topNavigator'>
              <h4>Business Management</h4>
              <p>Manage and monitor business accounts</p>
            </div>
            <BackPaper>
              <div className='searchBar' style={{ width: 'fit-content' }}>
                <input type="text" placeholder='Search business... ' onChange={searchHandle} id='searchtext' className='searchBarInput' />
                <Search className='searchIcon' />
              </div>
              {all.length === 0 && key ?
                <div className='d-flex justify-content-center flex-column align-items-center gap-2 empty-data'>
                  <BusinessOutlined className="icon" />
                  <div className='heading'>No Business Yet</div>
                  <div className='text'>Get started by adding a business through the app</div>
                </div>
                :
                <>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {/* <TableCell>Logo</TableCell> */}
                        <TableCell align='left' >Business Name</TableCell>
                        <TableCell>Business Email</TableCell>
                        <TableCell>Contact Number</TableCell>
                        <TableCell align='center'>Joined Since</TableCell>
                        <TableCell align='center'>Status</TableCell>
                        <TableCell align='center'>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {all.map((element, index) => {
                        return (<>
                          <TableRow key={index + 1} className={index % 2 === 0 ? 'rowBg' : null}>
                            <TableCell align='left'>
                              {element.business_logo !== '' ? (
                                <img src={`${BASE_URL + 'uploads/images/' + element.business_logo}`} alt="user" style={{ width: "30px", height: "30px", borderRadius: '50px' }} />
                              ) : (
                                <img src="/images/business.png" style={{ width: "30px", height: "30px", borderRadius: "50px" }} alt="" />

                              )}&nbsp;&nbsp;
                              {element.business_name}</TableCell>
                            <TableCell>{element.business_email}</TableCell>
                            <TableCell>{element.phone_number === '' ?
                              <>
                                Not Provided.
                              </>
                              :
                              <>
                                {element.countryCode + element.phone_number}
                              </>
                            }
                            </TableCell>
                            <TableCell align='center'>{moment(element.createdAt).format('YYYY-MM-DD')}</TableCell>
                            <TableCell align='center'>
                              {!element.isCertified ?
                                <div className='d-flex justify-content-center align-items-center gap-2'>
                                  <button className='accept' onClick={() => handleView(element)}>Approve</button>
                                  {/* <button className='decline'>Decline</button> */}
                                </div>
                                :
                                <>
                                  {element.isBlocked ? (
                                    <Chip label="Blocked" className="statusChipBlock" />)
                                    : (
                                      <Chip label="Active" className="statusChipActive" />)
                                  }
                                </>}
                            </TableCell>
                            <TableCell >
                              {!element.isCertified ?
                                <Grid container spacing={2} direction="row" justifyContent="start" alignItems="start">
                                  <Grid item>
                                    <Tooltip title="Click here!. Verify the certificate.">
                                      <Pageview className='visibilityIc' onClick={() => handleView(element)} />
                                    </Tooltip>
                                  </Grid>
                                  <Grid item>
                                    <Tooltip title="Send email to business user for their certificate is wrong. Please re-upload certificate.">
                                      <AttachEmail className='visibilityIc' onClick={() => handleEmail(element)} />
                                    </Tooltip>
                                  </Grid>
                                </Grid>
                                :
                                <div className='action'>
                                  <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                                    <Grid item>
                                      <Tooltip title="view profile" >
                                        <NavLink to={'/businesses/' + element._id} ><VisibilityOutlined className='icon' /></NavLink>
                                      </Tooltip>
                                    </Grid>
                                    <Grid item>
                                      <Tooltip title={!element.isBlocked ? 'block user' : 'unblock user'} >
                                        {element.isBlocked ?
                                          <LockOutlined className="icon" style={{ color: "red" }} onClick={() => { handleBlockOpen(element._id, element.isBlocked) }} />
                                          :
                                          <LockOpenOutlined className="icon" style={{ color: "green" }} onClick={() => { handleBlockOpen(element._id, element.isBlocked) }} />
                                        }
                                      </Tooltip>
                                    </Grid>
                                    <Grid item>
                                      <Tooltip title="Delete user from app" >
                                        <DeleteOutlineOutlined className="icon" onClick={() => { handleRemoveOpen(element._id) }} />
                                      </Tooltip>
                                    </Grid>
                                  </Grid>
                                </div>
                              }
                            </TableCell>
                          </TableRow>
                        </>
                        )

                      })}
                    </TableBody>
                  </Table>

                </>
              }
              {/* dilogue for block user */}
              <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  {status ? ("Are you sure you want to unblock this business?") : ("Are you sure you want to block this business?")}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleBlock}>Cancel</Button>
                  <Button onClick={() => { BlockUser(id) }} >{status ? 'unBlock' : 'Block'}</Button>
                </DialogActions>
              </Dialog>

              {/* dilogue for delete user */}
              <Dialog open={remopen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to delete this business from the app?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleRemove}>No</Button>
                  <Button onClick={() => { removeUser(id) }} >Yes</Button>
                </DialogActions>
              </Dialog>
              {all.length === 0 && key ? null :
                <div className='d-flex justify-content-between mt-4 align-items-center'>
                  <div className='table-count'>Showing {skip} to {Math.ceil(parseInt(skip) + parseInt(row))} of {providersCount} entries</div>
                  <Pagination count={Math.ceil(providersCount / row)} page={Math.floor(skip / row) + 1} variant="outlined" onChange={skipPagination} shape="rounded" />
                </div>}
            </BackPaper>
          </>

        )}
      <BootstrapDialog
        fullWidth={true}
        aria-labelledby="customized-dialog-title"
        open={certificate}
        maxWidth={'sm'}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Business Certificate
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
          <DetailText className='mt-4'>
            If you find any wrong certificate or incorrect information, please inform the business user by performing the email action. Without verification, we cannot display business in our app.          </DetailText>
        </DialogContent>
        <DialogActions>
          <button className="decline" onClick={handleClose}>
            Decline
          </button>
          <button className="accept" autoFocus onClick={VerifyNow}>
            Approve
          </button>
        </DialogActions>
      </BootstrapDialog>
      <BootstrapDialog
        fullWidth={true}
        aria-labelledby="customized-dialog-title"
        open={email}
        maxWidth={'sm'}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Write message for business user here
        </DialogTitle>
        <IconButton onClick={handleClose}
          aria-label="close" sx={{
            position: 'absolute',
            right: 8, top: 8, color: (theme) => theme.palette.grey[500],
          }} >
          <Close />
        </IconButton>
        <DialogContent dividers>
          <div className="send-email">
            <label for="message">Your message:</label>
            <textarea id="message" className="message-box mt-2" rows="5"></textarea>
          </div>
        </DialogContent>
        <DialogActions>
          <button className="decline" onClick={handleClose}>
            Cancel
          </button>
          <button className="accept" autoFocus onClick={VerifyNow}>
            Send
          </button>
        </DialogActions>
      </BootstrapDialog>
    </>
  )
}

export default Provider









