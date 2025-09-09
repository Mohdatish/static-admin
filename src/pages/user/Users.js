import {  DeleteOutlineOutlined, LockOpenOutlined, LockOutlined, PersonAddAlt, Search, VisibilityOutlined } from '@mui/icons-material'
import { Button, Chip, Dialog, DialogActions, DialogTitle, Grid,Pagination, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { deleteRequest, getRequest, postRequest } from "../../ApiFunction"
import { useSelector } from 'react-redux'
import API from '../../Api'
import { BackPaper, FilterIconDown, FilterIconUp } from '../../components/Styles'
import moment from 'moment'
import codes from 'country-calling-code';
import toast from 'react-hot-toast'


const Users = () => {
  const usersCount = useSelector(state => state.count.counts?.userCount);
  const [isLoading, setIsLoading] = useState(false)
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
  const [filterName, setFilterName] = useState(false)


  if (error === 203) {
    localStorage.clear();
    navigate('/')
    toast.info("Session expired")
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
      const result = await deleteRequest(`${API.DELETE_USER}`, { id: id })
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
      const result = await postRequest(`${API.BLOCK_UNBLOCK_USER}`, { id: id });
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

  const filterNames = () => {
    setFilterName(!filterName)
  }


  const getAll = async () => {
    const result = await getRequest(`${API.GET_ALL_USERS}?value=${key}&row=${row}&skip=${skip}&filterData=${filterName}`);
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
  }, [key, row, skip, filterName])


  const handleChange = (e) => {
    if (e.target.value === usersCount) {
      setSkip(0)
      setRow(usersCount)
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
              <h4>User Management</h4>
              <p>Manage and monitor users accounts</p>
            </div>
            <BackPaper>
              <div className='searchBar' style={{ width: 'fit-content' }}>
                <input type="text" placeholder='Search users... ' onChange={searchHandle} id='searchtext' className='searchBarInput' />
                <Search className='searchIcon' />
              </div>
              {all.length === 0 && key ?
                <div className='d-flex justify-content-center flex-column align-items-center gap-2 empty-data'>
                  <PersonAddAlt className="icon" />
                  <div className='heading'>No User Yet</div>
                  <div className='text'>Get started by adding a user through the app</div>
                </div>
                :
                <>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {/* <TableCell>User</TableCell> */}
                        <TableCell align='left' style={{ cursor: "pointer" }} onClick={filterNames}>Name&nbsp;
                          {filterName ? <FilterIconDown className="fontIcon" /> : <FilterIconUp className="fontIcon" />}</TableCell>
                        <TableCell align='left'>Email</TableCell>
                        <TableCell align='center'>Contact Number</TableCell>
                        <TableCell align='center'>Joined Since</TableCell>
                        <TableCell align='left'>Status</TableCell>
                        <TableCell align='center'>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {all.map((element, index) => {
                        return (<>
                          <TableRow key={index + 1} className={index % 2 === 0 ? 'rowBg' : null}>
                            <TableCell align='left' style={{ fontWeight: '700 !important' }}> {element.name}</TableCell>
                            <TableCell>{element.email}</TableCell>
                            <TableCell align='center'>{element.phone_number === '' ?
                              <>
                                Not provided
                              </>
                              :
                              <>
                                {element.countryCode + element.phone_number}
                              </>
                            }
                            </TableCell>
                            <TableCell align='center'>{moment(element.createdAt).format('YYYY-MM-DD')}</TableCell>
                            <TableCell>
                              {element.isBlocked ? (
                                <Chip label="Blocked" className="statusChipBlock" />)
                                : (
                                  <Chip label="Active" className="statusChipActive" />)
                              }</TableCell>
                            <TableCell>
                              <div className='action'>
                                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                                  <Grid item>
                                    <Tooltip title="view profile" >
                                      <NavLink to={'/users/' + element._id} ><VisibilityOutlined className='icon' /></NavLink>
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
                  {status ? ("Are you sure you want to unblock this user?") : ("Are you sure you want to block this user?")}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleBlock}>Cancel</Button>
                  <Button onClick={() => { BlockUser(id) }} >{status ? 'unBlock' : 'Block'}</Button>
                </DialogActions>
              </Dialog>

              {/* dilogue for delete user */}
              <Dialog open={remopen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to delete this user from the app?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleRemove}>No</Button>
                  <Button onClick={() => { removeUser(id) }} >Yes</Button>
                </DialogActions>
              </Dialog>
              {all.length === 0 && key ? null :
                <div className='d-flex justify-content-between mt-4 align-items-center'>
                  <div className='table-count'>Showing {skip} to {Math.ceil(parseInt(skip) + parseInt(row))} of {usersCount} entries</div>
                  <Pagination count={Math.ceil(usersCount / row)} page={Math.floor(skip / row) + 1} variant="outlined" onChange={skipPagination} shape="rounded" />
                </div>}
            </BackPaper>
          </>

        )}

    </>
  )
}

export default Users









