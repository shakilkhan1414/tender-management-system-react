import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect,useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

export const Dashboard = () => {

    const[users,setUsers]=useState('')
    const[tenders,setTenders]=useState('')
    const[totalAmount,setTotalAmount]=useState('')
    const[loading,setLoading]=useState(true)
    const navigate=useNavigate()

    useEffect(()=>{
        if(!User.loggedIn()){
            navigate('/')
        }
        getUsers()
        getTenders()

    },[])

    useEffect(()=>{
        if(!users || !tenders || !totalAmount){
            setLoading(true)
        }
        else{
            setLoading(false)
        }
    },[users,tenders,totalAmount])

    const getUsers=()=>{
        axios.get('/api/user')
        .then((res)=>{
            setUsers(res.data.length)
        })
    }

    const getTenders=()=>{
        axios.get('/api/tender')
        .then((res)=>{
            setTenders(res.data.length)
            setTotalAmount(()=>{
                return res.data.reduce((sum, tender) => sum + parseInt(tender.tender_price), 0);
            })
        })
    }

  return (
    <>
        <div className="pagetitle">
            <h1>Dashboard</h1>
            <nav>
                <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to='/dashboard'>Home</Link></li>
                <li className="breadcrumb-item active">Dashboard</li>
                </ol>
            </nav>
        </div>
        {loading && <div className='text-center'> <ClipLoader color="#4154f1" /></div>}

        {!loading &&

        <section className="section dashboard">
            <div className="row">

                <div className="col-xxl-4 col-md-4">
                <Link to='/users' className="card info-card sales-card">

                    <div className="card-body">
                    <h5 className="card-title">Total Users</h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-people"></i>
                        </div>
                        <div className="ps-3">
                        <h6>{users}</h6>
                        </div>
                    </div>
                    </div>

                </Link>
                </div>

                <div className="col-xxl-4 col-md-4">
                <Link to='/tenders' className="card info-card revenue-card">

                    <div className="card-body">
                    <h5 className="card-title">Total Tenders</h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-menu-button-wide"></i>
                        </div>
                        <div className="ps-3">
                        <h6>{tenders}</h6>

                        </div>
                    </div>
                    </div>

                </Link>
                </div>

                <div className="col-xxl-4 col-md-4">
                <Link to='/tenders' className="card info-card revenue-card">

                    <div className="card-body">
                    <h5 className="card-title">Total Price</h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div className="ps-3">
                        <h6>${totalAmount}</h6>
                        </div>
                    </div>

                    </div>

                </Link>
                </div>

        </div>
        </section>
        }

    </>
  )
}
