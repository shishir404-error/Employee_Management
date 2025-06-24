import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton
} from '@mui/material';

import { Visibility, Edit, Delete } from "@mui/icons-material";

const dummyData = [
  {
    // timestamp: '2025-06-24 11:00 AM',
    name: 'Shishir Sharma',
    empId: 'EMP001',
    designation: 'Developer',
    // aadhaarName: 'Shishir S.',
    // productNo: 'PN123',
    // serialNo: 'SN456',
    // modelNo: 'MN789',
    phoneNo: '9876543210',
    // imei: 'IMEI1234567890',
    doj: '2023-01-01',
    address: 'Delhi, India',
    // topImage: 'top.jpg',
    // middleImage: 'middle.jpg',
    // bottomImage: 'bottom.jpg',
    // chargerImage: 'charger.jpg',
    // phoneImage: 'phone.jpg',
  },
  // aur bhi rows yahan daal sakte ho...
];

export default function AssetsTable() {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', mt: 4 }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            {/* <TableCell><b>Timestamp</b></TableCell> */}
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>EmpID</b></TableCell>
            <TableCell><b>Designation</b></TableCell>
            {/* <TableCell><b>Aadhaar Name</b></TableCell> */}
            {/* <TableCell><b>Product No</b></TableCell> */}
            {/* <TableCell><b>Serial No</b></TableCell> */}
            {/* <TableCell><b>Model No</b></TableCell> */}
            <TableCell><b>Phone No</b></TableCell>
            {/* <TableCell><b>IMEI No</b></TableCell> */}
            <TableCell><b>Date of Joining</b></TableCell>
            <TableCell><b>Address</b></TableCell>
            {/* <TableCell><b>Top Image</b></TableCell> */}
            {/* <TableCell><b>Middle Image</b></TableCell> */}
            {/* <TableCell><b>Bottom Image</b></TableCell> */}
            {/* <TableCell><b>Charger Image</b></TableCell> */}
            {/* <TableCell><b>Phone Image</b></TableCell> */}
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((row, index) => (
            <TableRow key={index}>
              {/* <TableCell>{row.timestamp}</TableCell> */}
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.empId}</TableCell>
              <TableCell>{row.designation}</TableCell>
              {/* <TableCell>{row.aadhaarName}</TableCell> */}
              {/* <TableCell>{row.productNo}</TableCell> */}
              {/* <TableCell>{row.serialNo}</TableCell> */}
              {/* <TableCell>{row.modelNo}</TableCell> */}
              <TableCell>{row.phoneNo}</TableCell>
              {/* <TableCell>{row.imei}</TableCell> */}
              <TableCell>{row.doj}</TableCell>
              <TableCell>{row.address}</TableCell>
              {/* <TableCell>{row.topImage}</TableCell> */}
              {/* <TableCell>{row.middleImage}</TableCell> */}
              {/* <TableCell>{row.bottomImage}</TableCell> */}
              {/* <TableCell>{row.chargerImage}</TableCell> */}
              {/* <TableCell>{row.phoneImage}</TableCell> */}
              <TableCell>
                <IconButton color="primary" size="small" onClick={() => alert('View')}>
                  <Visibility fontSize="small" />
                </IconButton>
                <IconButton color="secondary" size="small" onClick={() => alert('Edit')}>
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton color="error" size="small" onClick={() => alert('Delete')}>
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
