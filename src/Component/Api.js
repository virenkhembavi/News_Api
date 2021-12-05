import React, { useEffect, useState, useCallback } from 'react'
import Axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { TextField } from '@mui/material';
import styled from 'styled-components'

export default function Api() {
    const [news, setNews] = useState([]);
    const [data, setData] = useState(null);

    // debouncing function has been used

    // const debounce = (func) => {
    //     let timer;
    //     return function (...args) {
    //         const context = this;
    //         if (timer) clearTimeout(timer)
    //         timer = setTimeout(() => {
    //             timer = null
    //             func.apply(context, args)
    //         }, 500)
    //     }
    // }

    useEffect(() => {

        Axios({
            url: `http://hn.algolia.com/api/v1/search?query=${data}`
        })
            .then(response => {
                const res = response.data
                setNews(res.hits);
                // console.log(res.hits);
            })
            .catch(error => {
                console.log(error);
            });

    }, [data])


    const handleChange = (event) => {
        setData(event.target.value)
        // console.log(event.target.value)
    }
    // useCallback(debounce(handleChange), [])
    // const optimisedversion = useCallback(debounce(handleChange), [])

    // useCallback(
    //     () => {
    //         debounce(handleChange)
    //     },
    //     [],
    // )


    return (
        <Container>
            <Section>
                <Bottom >
                    <h5 style={{
                        textAlign: "center",
                        fontSize: "35px",
                        fontFamily: "sans-serif",
                        textDecoration: "underline",
                        margin: "20px"
                    }}>Get Lastest News.</h5>
                    <Message>
                        <TextField id="outlined-basic" label="Search.." variant="outlined" value={data} onChange={handleChange} style={{ background: "white", width: "320px", }} />
                    </Message>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow >
                                    <TableCell>Index</TableCell>
                                    <TableCell align="left">News</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {news.map((title, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="left">{title.title}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Bottom>
            </Section>
        </Container >
    )
}

const Container = styled.div`
width:100%;
`
const Message = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-bottom: 5px;
`

const Section = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: lightgray;
`
const Bottom = styled.div`
width: 60%;
margin-top:10px;
/* background-color: brown; */
@media only screen and (max-width: 425px){
        width: 100%;
    }
`
