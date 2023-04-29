import { Breadcrumbs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import { getCurrentUser } from '../../services/renter'
import { getBucketsforRenter } from '../../services/Storj/bucket'
import '../../styles/Buckets.css'
import InputField from '../../components/InputField'
import DataTable from '../../components/DataTable'
import { Container } from '@mui/system'
import BasicModal from '../../components/BasicModal'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import BasicTable from '../../components/BasicTable'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import axios from 'axios'
import { simpleToast } from '../../services/utils'


const Buckets = () => {

    //Modal states and functions for new bucket
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const CustomIconStyle = { height: "100%", verticalAlign: "-30%", marginRight: "5%" }

    const renterId = "6445cd92a8c6e4da7ac7a9e0"
    const [bucketName, setBucketName] = useState('')
    const [network, setNetwork] = useState('storj')

    const handleBucketNameChange = (e) => {
        console.log(e.target.value)
        setBucketName(e.target.value)
    }
    const handleNetworkChange = (event, selected) => {
        console.log(selected)
        setNetwork(selected)
    }
    const handleCreateNewBucket = async (event) => {
        event.preventDefault()
        console.log("Creating new bucket", bucketName, network, renterId)
        simpleToast("Creating new bucket", "loading", 1000)
        try {
            const res = await axios.post(`http://localhost:8080/storj/bucket/createBucket`, null, { params: { bucketName, renterId } })
            console.log("Bucket created successfully", res.data)
            setDataDependency(res.data)
            simpleToast("Bucket created successfully", "success")
        }

        catch (err) {
            console.log("Error occured while creating bucket", err)
            simpleToast("Error occured while creating bucket", "error")
        }

        handleClose()
    }

    const handleSearchNameChange = (e) => {
        console.log(e.target.value)
    }

    const [dataDepenency, setDataDependency] = useState('')
    const [bucketsData, setBucketsData] = useState([
        {
            id: "5f9f1b0b-1b1a-4b1a-9c1a-1b1a4b1a9c1a",
            name: "testbucket",
            network: "storj",
            created: "2021-10-05T15:00:00.000Z",
            objects: 2
        },
        {
            id: "4f8f1b0b-1b1a-4b1a-9c1a-1b1a4b1a9c1a",
            name: "testbucket2",
            network: "storj",
            created: "2021-10-05T15:00:00.000Z",
            objects: 41
        },
        {
            id: "3f7f1b0b-1b1a-4b1a-9c1a-1b1a4b1a9c1a",
            name: "testbucket3",
            network: "ipfs",
            created: "2021-10-05T15:00:00.000Z",
            objects: 20
        }
    ])


    const [loading, setLoading] = useState(true)

    const fetchBucketsforRenter = async () => {
        const id = getCurrentUser()
        const data = await getBucketsforRenter(renterId)
        // console.log("renter bucket data", data)
        setBucketsData(data)

    }

    // const handleDeleteBucket = async (bucketId) => {
    // }

    useEffect(() => {
        fetchBucketsforRenter()
    }, [dataDepenency])

    return (
        <div className="buckets-wrapper">
            <BasicModal open={open} handleClose={handleClose} handleOpen={handleOpen} handleNameChange={handleBucketNameChange} handleCreateNewBucket={handleCreateNewBucket} handleNetworkChange={handleNetworkChange} network={network} />

            <div className='buckets-header'>
                <h1>Buckets</h1>
                <Button icon={<AddCircleOutlineOutlinedIcon sx={CustomIconStyle} />} type="Button" text="Create Bucket" style={{ minWidth: "200px", fontSize: "20px", backgroundColor: "#FFD817" }} onClick={handleOpen}></Button>
            </div>
            <div className="bucket-search-wrapper" >
                <InputField placeholder="Type bucket name" handleNameChange={handleSearchNameChange} />

            </div>
            <br />
            <div className='buckets-list-wrapper'>
                <BasicTable page={"bucket"} headers={["Name", "Network", "Objects", "Created"]} rowData={bucketsData} />
            </div>
        </div >
    )
}

export default Buckets