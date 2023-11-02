import { useNavigate, useParams } from 'react-router-dom'
import SignupSteps, { ApiURL } from '../../utils/navRoutes'
import Navigation from '../../component/navigation/navigation'
import Page from '../../component/page/page'
import axios from '../../api/axios'
import { useEffect, useState } from 'react'
import Title from '../../component/title/title'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Stack,
  Alert,
} from '@mui/material'
import { Capitalize } from '../../utils/capitalize'
import './style.scss'

type Transaction = {
  id: number
  date: string
  type: string
  amount: number
  email: string
}

const transaction = {
  id: 1,
  date: '2021-10-10',
  type: 'send',
  amount: 10,
  email: 'mail@mail.com',
}

const Transaction = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(SignupSteps.Balance)
  }

  const { transactionId } = useParams()

  const [data, setData] = useState<Transaction>([] as any)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        await axios.get('/transactions').then((res) => {
          const data = res.data
          const transaction = data.transactions.find(
            (transaction: Transaction) =>
              transaction.id === Number(transactionId),
          )
          setData(transaction)
          setLoading(false)
        })
      } catch (error) {
        setError('Could not get transactions')
        setLoading(false)
      }
    }
    fetchData()
  }, [transactionId])

  function createData(name: string, value: string | number) {
    return { name, value }
  }

  const rows = [
    createData('Date', data.date),
    createData('Address', data.email),
    createData('Type', data.type ? Capitalize(data.type) : ''),
  ]

  const style = {
    fontSize: '1.2rem',
    fontFamily: 'Jost, sans-serif',
  }

  return (
    <Page>
      <Navigation
        title={`Transaction ${transactionId}`}
        handleClick={handleBack}
      />
      <Title title='200' isBlack />
      {loading ? (
        <Stack sx={{ width: '100%', marginTop: '2rem' }} spacing={2}>
          <Alert variant='outlined' severity='info'>
            Loading...
          </Alert>
        </Stack>
      ) : error ? (
        <Stack sx={{ width: '100%', marginTop: '2rem' }} spacing={2}>
          <Alert variant='outlined' severity='error'>
            {error}
          </Alert>
        </Stack>
      ) : data ? (
        <TableContainer className='table'>
          <Table aria-label='simple table' size='small'>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell component='th' scope='row' sx={style}>
                    {row.name}
                  </TableCell>
                  <TableCell align='right' sx={style}>
                    {row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack sx={{ width: '100%', marginTop: '2rem' }} spacing={2}>
          <Alert variant='outlined' severity='info'>
            No transactions
          </Alert>
        </Stack>
      )}
    </Page>
  )
}

export default Transaction
