import React, { useState } from 'react';
import {
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';

const getRandomNumber = (): number => Math.floor(Math.random() * 10) + 1;

type HistoryEntry = {
  num1: number;
  num2: number;
  symbol: string;
  result: string;
};

const KidsNumberGame: React.FC = () => {
  const [num1, setNum1] = useState<number>(getRandomNumber());
  const [num2, setNum2] = useState<number>(getRandomNumber());
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const generateNewNumbers = (): void => {
    setNum1(getRandomNumber());
    setNum2(getRandomNumber());
    setSelectedSymbol('');
    setIsCorrect(null);
  };

  const handleAnswer = (answer: 'greater' | 'less' | 'equal', symbol: string): void => {
    setSelectedSymbol(symbol);
    const correctAnswer =
      (num1 > num2 && answer === 'greater') ||
      (num1 < num2 && answer === 'less') ||
      (num1 === num2 && answer === 'equal');
    setIsCorrect(correctAnswer);
    setAttempts(prev => prev + 1);
    setHistory(prev => [...prev, { num1, num2, symbol, result: correctAnswer ? '✔' : '✘' }]);
    if (correctAnswer) {
      setScore(prev => prev + 1);
      setTimeout(generateNewNumbers, 1000);
    }
  };

  return (
    <Box
      textAlign='center'
      mt={5}
    >
      <Typography variant='h4'>Compare the Numbers!</Typography>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        mt={3}
      >
        <Typography variant='h2'>{num1}</Typography>
        <Box
          width={50}
          height={50}
          border={2}
          mx={2}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Typography variant='h2'>{selectedSymbol}</Typography>
        </Box>
        <Typography variant='h2'>{num2}</Typography>
      </Box>
      <Box mt={3}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleAnswer('greater', '>')}
        >
          &gt;
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => handleAnswer('less', '<')}
          sx={{ mx: 2 }}
        >
          &lt;
        </Button>
        <Button
          variant='contained'
          color='success'
          onClick={() => handleAnswer('equal', '=')}
        >
          =
        </Button>
      </Box>
      {isCorrect !== null && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant='h5'
            color={isCorrect ? 'green' : 'red'}
            mt={3}
          >
            {isCorrect ? 'Correct! 🎉' : 'Try Again! ❌'}
          </Typography>
        </motion.div>
      )}
      <Box mt={4}>
        <Typography variant='h6'>
          Score: {score} / {attempts}
        </Typography>
      </Box>
      <Box mt={4}>
        <Typography variant='h6'>Game History</Typography>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 400, margin: 'auto', maxHeight: 300, overflowY: 'auto' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Number 1</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Number 2</TableCell>
                <TableCell>Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.num1}</TableCell>
                  <TableCell>{entry.symbol}</TableCell>
                  <TableCell>{entry.num2}</TableCell>
                  <TableCell>{entry.result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default KidsNumberGame;
